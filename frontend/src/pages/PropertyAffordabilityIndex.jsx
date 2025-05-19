import { useMemo, useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
import Loading from "@/components/Loading";
import SortableHeader from "@/components/SortableHeader";
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
  const [minIndex, setMinIndex] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: "norm_affordability_index",
    direction: "desc",
  });

  const pollForResult = () => {
    const pollingInterval = setInterval(async () => {
      try {
        const url =
          "https://suburb-livability-bucket.s3.us-east-1.amazonaws.com/results/property_afford_large_data.json.json";
        await axios.head(url);

        const result = await axios.get(url);
        // console.log("result =", result);
        setAffordabilityData(result.data.affordability_data);
        setMapHtml(result.data.map_html);
        setLoading(false);
        clearInterval(pollingInterval);
      } catch (err) {
        // HEAD will throw error if not found - do nt hing and keep polling
      }
    }, 10000);
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
    setFetched(true);
    const requestBody = {
      id: id,
      income: parseInt(income),
      function_name: "property_affordability_index",
    };

    pollForResult();
    // const response = await axios.post(
    //   "https://7c4yt1yrr2.execute-api.us-east-1.amazonaws.com/property_affordability_index",
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

  const handleSort = (key) => {
    console.log(key);
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  const sortedData = useMemo(() => {
    if (!affordabilityData) return [];
    const sorted = [...affordabilityData];
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
  }, [affordabilityData, sortConfig]);
  return (
    <div>
      <Panel
        title="Property Affordability Index"
        description={
          "See how affordable each suburb is based on your given income. We take into account Median multiple indicator, housing costs as percentage of gross income."
        }
        loading={loading}
      >
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
        {loading ? (
          <Loading />
        ) : (
          <RunButton text={"Submit"} onClick={fetchData} />
        )}

        {!loading && affordabilityData !== null && (
          <div className="ret w-full ">
            <div className="ret max-h-96 overflow-auto border border-white/20 rounded-lg backdrop-blur-sm mt-4">
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
                      label=" Normalized Affordability Index"
                      field="norm_affordability_index"
                      sortConfig={sortConfig}
                      onClick={handleSort}
                    />
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {sortedData.map((recommendation, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">{recommendation.suburb}</td>
                      <td className="px-6 py-4">
                        {recommendation.norm_affordability_index}
                      </td>
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
