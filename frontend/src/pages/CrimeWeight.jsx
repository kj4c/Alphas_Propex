import { useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";

const CrimeWeight = () => {
  const [id, setId] = useState(null);
  const [suburbInput, setSuburbInput] = useState("");
  const [suburbs, setSuburbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const addSuburb = () => {
    if (suburbInput.trim() !== "" && !suburbs.includes(suburbInput.trim())) {
      setSuburbs([...suburbs, suburbInput.trim()]);
      setSuburbInput("");
    }
  };

  const removeSuburb = (sub) => {
    setSuburbs(suburbs.filter((s) => s !== sub));
  };

  const fetchData = async () => {
    if (!id) {
      alert("Please enter an ID");
      return;
    }
  
    if (suburbs.length === 0) {
      alert("Please enter at least one suburb");
      return;
    }
  
    setLoading(true);
    const allResults = [];
  
    for (const suburb of suburbs) {
      try {
        console.log("Fetching for suburb:", suburb);
        const response = await axios.post(
          "https://7c4yt1yrr2.execute-api.us-east-1.amazonaws.com/crime_rate",
          {
            id,
            function_name: "crime_rate",
            suburb,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        const data = response.data;
  
        if (Array.isArray(data)) {
          allResults.push(...data);
        }
      } catch (err) {
        console.error(`Failed to fetch data for ${suburb}:`, err);
      }
    }
  
    setResults(allResults);
    setLoading(false);
  };
  

  return (
    <div className="page">
      <Panel
        title="Weighted Crime Rate"
        description="Check the weighted crime rate per 10k population by suburbs."
        loading={loading}
      >
        <BasicInput
          type="text"
          name="id"
          placeholder="Enter ID"
          value={id || ""}
          onChange={(e) => setId(e.target.value)}
        />

        <div className="flex gap-2 mb-4 justify-center items-center">
          <BasicInput
            type="text"
            name="suburb"
            placeholder="Enter suburb name"
            value={suburbInput}
            onChange={(e) => setSuburbInput(e.target.value)}
          />
          <Button onClick={addSuburb}>Add</Button>
        </div>

        <div className="mb-4 text-sm text-white/70">
          {suburbs.map((sub, i) => (
            <span
              key={i}
              className="inline-block bg-white/10 px-2 py-1 rounded mr-2 mb-1"
            >
              {sub}{" "}
              <button
                className="text-red-400 ml-1"
                onClick={() => removeSuburb(sub)}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {loading ? (
          <Loading />
        ) : (
          <RunButton text="Submit" onClick={fetchData} />
        )}

        {/* Table of Results */}
        {results.length > 0 && !loading && (
          <div className="mt-6">
            <div className="w-full overflow-x-auto rounded-lg border border-white/20 backdrop-blur-sm">
              <table className="min-w-full text-sm text-left text-white/90">
                <thead className="bg-white/10 text-white uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Suburb</th>
                    <th className="px-6 py-3">Weighted crime rate</th>
                    <th className="px-6 py-3">Average price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {results.map((rec, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">{rec.suburb}</td>
                      <td className="px-6 py-4">{rec.crime_rate}</td>
                      <td className="px-6 py-4">{rec.median_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Panel>
    </div>
  );
};

export default CrimeWeight;
