import { useEffect, useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
import Loading from "@/components/Loading";
import { v4 as uuidv4 } from "uuid";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SuburbLivability = () => {
  const [loading, setLoading] = useState(false);
  const [weight, setWeight] = useState(0.4);
  const [sizeWeight, setSizeWeight] = useState(0.3);
  const [density, setDensity] = useState(0.1);
  const [crimeRiskWeight, setCrimeRiskWeight] = useState(0.1);
  const [weatherRiskWeight, setWeatherRiskWeight] = useState(0.1);
  const [id, setId] = useState(null);
  const [livabilityData, setLivabilityData] = useState(null);
  const [mapHtml, setMapHtml] = useState(null);
  const [minIndex, setMinIndex] = useState(0);

  const pollForResult = (jobId) => {
    const pollingInterval = setInterval(async () => {
      try {
        // const url = `https://suburb-livability-bucket.s3.us-east-1.amazonaws.com/results/${jobId}.json`;
        const url =
          "https://suburb-livability-bucket.s3.us-east-1.amazonaws.com/results/suburb_livability_large_data.json";
        await axios.head(url);

        const result = await axios.get(url);
        // console.log("result =", result);
        setLivabilityData(result.data.livability_data);
        setMapHtml(result.data.map_html);
        setLoading(false);
        clearInterval(pollingInterval);
      } catch (err) {
        // HEAD will throw error if not found - do nt hing and keep polling
      }
    }, 15000);
  };

  // const pollForResult = (jobId) => {
  //   const pollingInterval = setInterval(async () => {
  //     try {
  //       const url =
  //         "https://suburb-livability-bucket.s3.us-east-1.amazonaws.com/results/056db016-b849-402e-a69c-6eb56a1428e7.json";
  //       await axios.head(url);

  //       const result = await axios.get(url);
  //       console.log("result =", result);
  //       setLivabilityData(result.data.livability_data);
  //       setMapHtml(result.data.map_html);
  //       setLoading(false);
  //       clearInterval(pollingInterval);
  //     } catch (err) {
  //       // HEAD will throw error if not found - do nt hing and keep polling
  //     }
  //   }, 3000);
  // };

  const fetchData = async () => {
    if (id == null) {
      alert("missing id");
      return;
    }
    setLoading(true);

    const uniqueId = uuidv4();
    // console.log("uniqueId = ", uniqueId);
    const requestBody = {
      id: id,
      proximity_weight: parseFloat(weight) || 0.4,
      property_size_weight: parseFloat(sizeWeight) || 0.3,
      population_density_weight: parseFloat(density) || 0.1,
      crime_risk_weight: parseFloat(crimeRiskWeight) || 0.1,
      weather_risk_weight: parseFloat(weatherRiskWeight) || 0.1,
      function_name: "suburb_livability_score",
      job_id: uniqueId,
    };

    try {
      await axios.post(
        "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/suburb_livability_queue",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error sending sqs job:", error);
      alert("Failed to send sqs job. Please try again.");
      setLoading(false);
    }

    pollForResult(uniqueId);
  };

  const filteredRet = livabilityData?.filter(
    (r) => r.livability_score >= minIndex
  );

  return (
    <div>
      <Panel
        title="Suburb Livability Score"
        description="Calculates livability score given weightings of proximity to CBD, property size, population density, crime risk and weather risk"
        loading={loading}      
      >
        <BasicInput
          type="text"
          name="id"
          placeholder="Id"
          onChange={(e) => {
            if (e.target.value !== "") {
              setId(e.target.value);
            } else {
              setId(null);
            }
          }}
        />
        <BasicInput
          type="text"
          name="proximityWeight"
          placeholder="Proximity weight"
          onChange={(e) => {
            if (e.target.value !== "") {
              setWeight(e.target.value);
            }
          }}
        />
        <BasicInput
          type="text"
          name="sizeWeight"
          placeholder="Property size weight"
          onChange={(e) => {
            if (e.target.value !== "") {
              setSizeWeight(e.target.value);
            }
          }}
        />
        <BasicInput
          type="text"
          name="densityWeight"
          placeholder="Population density weight"
          onChange={(e) => {
            if (e.target.value !== "") {
              setDensity(e.target.value);
            }
          }}
        />
        <BasicInput
          type="text"
          name="crimeRiskWeight"
          placeholder="Crime risk weight"
          onChange={(e) => {
            if (e.target.value !== "") {
              setCrimeRiskWeight(e.target.value);
            }
          }}
        />
        <BasicInput
          type="text"
          name="weatherRiskWeight"
          placeholder="Weather risk weight"
          onChange={(e) => {
            if (e.target.value !== "") {
              setWeatherRiskWeight(e.target.value);
            }
          }}
        />

        {loading ? <Loading/> :<RunButton text={"Submit"} onClick={fetchData} />}

        {!loading && livabilityData !== null && (
          <div className="ret w-full">
            <div className="max-h-96 overflow-auto border border-white/20 rounded-lg backdrop-blur-sm mt-4">
              <table className="min-w-full text-sm text-left text-white/90">
                <thead className="bg-gray-500 text-white uppercase text-xs tracking-wider sticky top-0 backdrop-blur-sm z-10">
                  <tr>
                    <th className="px-6 py-3">Suburb</th>
                    <th className="px-6 py-3">Livability Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {livabilityData.map((entry, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">{entry.suburb}</td>
                      <td className="px-6 py-4">{entry.livability_score.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full h-96 mt-10">
              <label>Min Livability Score: {minIndex}</label>
              <input
                type="range"
                min={0}
                max={100}
                value={minIndex}
                onChange={(e) => setMinIndex(Number(e.target.value))}
              />
              <ResponsiveContainer className="mt-4">
                <BarChart data={filteredRet}>
                  <XAxis
                    dataKey="suburb"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="livability_score" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div
              className="mt-10"
              dangerouslySetInnerHTML={{ __html: mapHtml }}
            />
          </div>
        )}
      </Panel>
    </div>
  );
};

export default SuburbLivability;
