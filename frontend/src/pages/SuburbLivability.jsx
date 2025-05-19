import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
import Loading from "@/components/Loading";
import { v4 as uuidv4 } from "uuid";
import SortableHeader from "@/components/SortableHeader";
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
  const [livabilityData, setLivabilityData] = useState(null);
  const [mapHtml, setMapHtml] = useState(null);
  const [minIndex, setMinIndex] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: "livability_score", direction: "desc" });

  const pollForResult = (jobId) => {
    const pollingInterval = setInterval(async () => {
      try {
        // const url = `https://suburb-livability-bucket.s3.us-east-1.amazonaws.com/results/${jobId}.json`;
        const url =
          "https://suburb-livability-bucket.s3.us-east-1.amazonaws.com/results/suburb_livability_big_data.json";
        await axios.head(url);

        const result = await axios.get(url);
        setLivabilityData(result.data.livability_data);
        setMapHtml(result.data.map_html);
        setLoading(false);
        clearInterval(pollingInterval);
      } catch (err) {
        // HEAD will throw error if not found - do nt hing and keep polling
      }
    }, 15000);
  };

  const getId = () => {
    const storedId = localStorage.getItem('id');
    if (!storedId) return "76d3b838-5880-4320-b42f-8bd8273ab6a0"; // fallback to 'Default'

    return storedId;
  };

  const fetchData = async () => {
    const id = getId()
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

    // try {
    //   queue_response = await axios.post(
    //     "https://7c4yt1yrr2.execute-api.us-east-1.amazonaws.com/suburb_livability_queue",
    //     requestBody,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   console.log(queue_response);
    // } catch (error) {
    //   console.error("Error sending sqs job:", error);
    //   alert("Failed to send sqs job. Please try again.");
    //   setLoading(false);
    // }

    pollForResult(uniqueId);
  };

  const filteredRet = livabilityData?.filter(
    (r) => r.livability_score >= minIndex
  );

  const handleSort = (key) => {
    console.log(key);
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };


  const sortedData = useMemo(() => {
      if (!livabilityData) return [];
      const sorted = [...livabilityData];
      if (sortConfig.key) {
        sorted.sort((a, b) => {
          const valA = a[sortConfig.key];
          const valB = b[sortConfig.key];
          if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
          if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        });
      }
      return sorted;
    }, [livabilityData, sortConfig]);

  return (
    <div>
      <Panel
        title="Suburb Livability Score"
        description="Discover the best suburbs to live in based on livability score given weightings of proximity to CBD, property size, population density, crime risk and weather risk"
        loading={loading}      
      >
        <BasicInput
          type="text"
          name="proximityWeight"
          placeholder="Proximity Weight"
          onChange={(e) => {
            if (e.target.value !== "") {
              setWeight(e.target.value);
            }
          }}
        />
        <BasicInput
          type="text"
          name="sizeWeight"
          placeholder="Property Size Weight"
          onChange={(e) => {
            if (e.target.value !== "") {
              setSizeWeight(e.target.value);
            }
          }}
        />
        <BasicInput
          type="text"
          name="densityWeight"
          placeholder="Population Density Weight"
          onChange={(e) => {
            if (e.target.value !== "") {
              setDensity(e.target.value);
            }
          }}
        />
        <BasicInput
          type="text"
          name="crimeRiskWeight"
          placeholder="Crime Risk Weight"
          onChange={(e) => {
            if (e.target.value !== "") {
              setCrimeRiskWeight(e.target.value);
            }
          }}
        />
        <BasicInput
          type="text"
          name="weatherRiskWeight"
          placeholder="Weather Risk Weight"
          onChange={(e) => {
            if (e.target.value !== "") {
              setWeatherRiskWeight(e.target.value);
            }
          }}
        />

        {loading ? (
          <Loading />
        ) : (
          <RunButton text={"Submit"} onClick={fetchData} />
        )}

        {!loading && livabilityData !== null && (
          <div className="ret w-full">
            <div className="max-h-96 overflow-auto border border-white/20 rounded-lg backdrop-blur-sm mt-4">
              <table className="min-w-full text-sm text-left text-white/90">
                <thead className="bg-gray-500 text-white uppercase text-xs tracking-wider sticky top-0 backdrop-blur-sm z-10">
                  <tr>
                    <SortableHeader
                      label="Suburb"
                      field="suburb"
                      sortConfig={sortConfig}
                      onClick={handleSort}
                    />
                    <SortableHeader
                      label="Livability Score"
                      field="livability_score"
                      sortConfig={sortConfig}
                      onClick={handleSort}
                    />
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {sortedData.map((entry, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">{entry.suburb}</td>
                      <td className="px-6 py-4">
                        {entry.livability_score.toFixed(2)}
                      </td>
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
