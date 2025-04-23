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
    setRecs(JSON.parse(response.data.recommendations));
  };

  return (
    <div>
      <Panel
        title={"Commercial Recommendations"}
        description={"Discover high potential suburbs for commercial growth with tailored commercial business types based on income, population density and demographic trends."}
        loading={loading}
      >
        <BasicInput
          type="text"
          name="id"
          placeholder="Id"
          onChange={(e) => setId(e.target.value || null)}
        />
        {loading ? (
          <Loading />
        ) : (
          <RunButton text={"Submit"} onClick={fetchPrice} />
        )}
=========

        <BasicInput
          type="text"
          name="top_n"
          placeholder="Number of Recommendations"
          onChange={(e) => setId(e.target.value || null)}
        />
    
        {loading ? (
          <Loading />
        ) : (
          <RunButton text={"Submit"} onClick={fetchPrice} />
        )}

        {recs !== null && !loading && (
          <div className="recs">
            <div className="w-full overflow-x-auto rounded-lg border border-white/20 backdrop-blur-sm">
              <table className="min-w-full text-sm text-left text-white/90">
                <thead className="bg-white/10 text-white uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Suburb</th>
                    <th className="px-6 py-3">Median Income</th>
                    <th className="px-6 py-3">Population Density</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {recs.map((recommendation, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">{recommendation.suburb}</td>
                      <td className="px-6 py-4">
                        {recommendation.suburb_median_income}
                      </td>
                      <td className="px-6 py-4">
                        {recommendation.population_density}
                      </td>
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

export default CommercialRecs;
