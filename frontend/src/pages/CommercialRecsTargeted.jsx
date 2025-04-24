import { useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Panel from "@/components/Blocks";
import Loading from "@/components/Loading";

const CommercialRecommendationsTargeted = () => {
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
      function_name: "commercial_recs_targeted",
      top_n: topN,
    };

    const response = await axios.post(
      "https://7c4yt1yrr2.execute-api.us-east-1.amazonaws.com/commercial_recs_targeted",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    setRecs(response.data.targeted_recommendations);
  };

  const getDominantPersonaKey = (demo) =>
    Object.entries(demo).reduce(
      (best, current) => (current[1] > best[1] ? current : best),
      ["", -Infinity]
    )[0];
  
  /** Optional: map the raw keys to readable labels */
  const DEMO_LABELS = {
    female_ratio: "Female-Dominant",
    male_ratio: "Male-Dominant",
    children_oriented: "Children Oriented",
    older_children_oriented: "Older Children Oriented",
  };

  return (
    <div>
      <Panel
        title={"Targeted Commercial Recommendations"}
        description={"Discover targeted commercial types for high potential suburbs based on suburb demographics."}
        subDescriptionLabel={"Suburb Demographics"}
        subDescriptionItems={[
          "Male Dominanted",
          "Female Dominanted",
          "Children Oriented",
          "Older Children Oriented"
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
          <div className="recs">
            <div className="w-full overflow-x-auto rounded-lg border border-white/20 backdrop-blur-sm">
              <table className="min-w-full text-[18px] text-center text-white/90">
                <thead className="bg-white/10 text-white uppercase text-[18px] tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Rank</th>
                    <th className="px-6 py-3">Suburb</th>
                    <th className="px-6 py-3">Majority Demographic</th>
                    <th className="px-6 py-3">Demographic Scores</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {recs.map((recommendation, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4 font-bold">{recommendation.suburb}</td>
                      <td className="px-6 py-4 font-semibold">
                        {DEMO_LABELS[getDominantPersonaKey(recommendation.demographics)] ?? "—"}
                        </td>
                      <td className="px-6 py-4">
                        <ul className="flex flex-wrap gap-x-2 gap-y-1">
                            {prettifyDemographics(recommendation.demographics).map((tag, i) => (
                            <li key={i} className="inline-block text-[18px] text-white/90 bg-white/10 rounded px-2 py-0.5">
                                {tag}
                            </li>
                            ))}
                        </ul>
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

export default CommercialRecommendationsTargeted;

const prettifyDemographics = (demoObj) =>
    Object.entries(demoObj)
      .sort()
      .map(([k, v]) => {
        const label = k
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        return `${label} ${v.toFixed(1)}%`;
      });