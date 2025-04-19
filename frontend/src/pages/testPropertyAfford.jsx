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

const TestPropertyAfford = () => {
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [income, setIncome] = useState("32292");
  const [affordabilityData, setAffordabilityData] = useState(null);
  const [mapHtml, setMapHtml] = useState(null);
  const [id, setId] = useState(null);
  const [minIndex, setMinIndex] = useState(0);

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

    const response = await axios.post(
      "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/property_affordability_index",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    setAffordabilityData(response.data.affordability_data);
    setMapHtml(response.data.map_html);
  };

  const filteredRet = affordabilityData?.filter(
    (r) => r.norm_affordability_index >= minIndex
  );

  return (
    <div>
      <Panel
        title="Test Property Affordability Index"
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
            <div className="ret max-h-96 overflow-auto border border-white/30 rounded-md mt-4">
              <table className="">
                <thead>
                  <tr>
                    <th>Suburb</th>
                    <th>Normalized Affordability Index</th>
                  </tr>
                </thead>
                <tbody>
                  {affordabilityData.map((recommendation, index) => (
                    <tr key={index}>
                      <td>{recommendation.suburb}</td>
                      <td>{recommendation.norm_affordability_index}</td>
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
              <ResponsiveContainer>
                <BarChart data={filteredRet}>
                  <XAxis
                    dataKey="suburb"
                    angle={-45}
                    textAnchor="end"
                    height={80}
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

export default TestPropertyAfford;
