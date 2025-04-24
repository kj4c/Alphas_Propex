import { useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Panel from "@/components/Blocks";
import Loading from "@/components/Loading";

const CommercialRecs = () => {
  const [id, setId] = useState(null);
  const [topN, setTopN] = useState(10);
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchPrice = async () => {
    if (id == null) {
      alert("no id given");
      return;
    }

    setLoading(true);
    const requestBody = {
      id: id,
      function_name: "commercial_recs",
      top_n: topN,
    };

    const response = await axios.post(
      "https://7c4yt1yrr2.execute-api.us-east-1.amazonaws.com/commercial_recs",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    setRecs(response.data.recommendations);
  };

  return (
    <div>
      <Panel
        title={"Commercial Recommendations"}
        description={"Discover high potential suburbs for commercial growth with tailored commercial business types based on income and population density."}
        subDescriptionLabel={"How We Rank Suburbs"}
        subDescriptionItems={[
          "Population Density (people/square km)",
          "Median Income"
        ]}
        loading={loading}
      >
        <BasicInput
          type="text"
          name="id"
          placeholder="Dataset ID"
          onChange={(e) => setId(e.target.value || null)}
        />

        <BasicInput
          type="number"
          name="top_n"
          placeholder="Number of Recommendations"
          onChange={(e) => setTopN(parseInt(e.target.value) || 10)}
        />    
    
        {loading ? (
          <Loading />
        ) : (
          <RunButton text={"Submit"} onClick={fetchPrice} />
        )}

        {recs !== null && !loading && (
            <div className="w-full flex justify-center overflow-x-auto rounded-lg border border-white/20 backdrop-blur-sm">
          <table className="min-w-full text-[18px] text-center text-white/90 mt-4 mb-4">
            <thead className="bg-[--color-gray-800] text-white uppercase text-[18px] tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Rank</th>
                    <th className="px-6 py-3">Suburb</th>
                    <th className="px-6 py-3">Suburb Population</th>
                    <th className="px-6 py-3">Population Density (people/sqkm)</th>
                    <th className="px-6 py-3">Commercial Score</th>
                   
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {recs.map((recommendation, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-40 py-4 font-bold">{recommendation.suburb}</td>
                      <td className="px-6 py-4">{recommendation.suburb_population}</td>
                      <td className="px-6 py-4">{recommendation.population_density}</td>
                      <td className="px-6 py-4">
                        {(recommendation.composite_score * 100).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        )}
      </Panel>
    </div>
  );
};

export default CommercialRecs;
