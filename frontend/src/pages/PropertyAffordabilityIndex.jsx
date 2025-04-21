import { useEffect, useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PropertyAffordabilityIndex = () => {
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [income, setIncome] = useState("32292");
  const [affordabilityData, setAffordabilityData] = useState(null);
  const [mapHtml, setMapHtml] = useState(null);
  const [id, setId] = useState(null);
  const [minIndex, setMinIndex] = useState(0);

  const pollForResult = () => {
    const pollingInterval = setInterval(async () => {
      try {
        const url =
          "https://suburb-livability-bucket.s3.us-east-1.amazonaws.com/results/property_afford_large_data.json";
        await axios.head(url);

        const result = await axios.get(url);
        console.log("result =", result);
        setAffordabilityData(result.data.affordability_data);
        setMapHtml(result.data.map_html);
        setLoading(false);
        clearInterval(pollingInterval);
      } catch (err) {
        // HEAD will throw error if not found - do nt hing and keep polling
      }
    }, 10000);
  };

  const fetchData = async () => {
    if (id == null) {
      alert("missing id");
      return;
    }
    setLoading(true);
    setFetched(true);
    const requestBody = {
      id: id,
      income: parseInt(income),
      function_name: "property_affordability_index",
    };

    pollForResult();
    // const response = await axios.post(
    //   "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/property_affordability_index",
    //   requestBody,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // setLoading(false);
    // setAffordabilityData(response.data.affordability_data);
    // setMapHtml(response.data.map_html);
  };

  const filteredRet = affordabilityData?.filter(
    (r) => r.norm_affordability_index >= minIndex
  );

  return (
    <div>
      <Panel
        title="Property Affordability Index"
        description={"How affordable each suburb is based on given income"}
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
          name="income"
          placeholder="Income"
          onChange={(e) => {
            if (e.target.value !== "") {
              setIncome(e.target.value);
            }
          }}
        />
        <RunButton text="Fetch" onClick={fetchData} />

        {loading && <p>Loading...</p>}

        {!loading && affordabilityData !== null && (
          <div className="ret w-full ">
            <div className="ret max-h-96 overflow-auto border border-white/20 rounded-lg backdrop-blur-sm mt-4">
              <table className="min-w-full text-sm text-left text-white/90">
                <thead className="bg-gray-500 text-white uppercase text-xs tracking-wider sticky top-0 backdrop-blur-sm z-10">
                  <tr>
                    <th className="px-6 py-3">Suburb</th>
                    <th className="px-6 py-3">Normalized Affordability Index</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {affordabilityData.map((recommendation, index) => (
                    <tr key={index}  className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">{recommendation.suburb}</td>
                      <td className="px-6 py-4">{recommendation.norm_affordability_index}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full h-96 mt-10">
              <label>Min Affordability Index: {minIndex}</label>
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
                  <Bar dataKey="norm_affordability_index" fill="#8884d8" />
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

export default PropertyAffordabilityIndex;
