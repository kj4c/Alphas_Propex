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
          "Young Adults Oriented"
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
              <table className="min-w-full text-sm text-left text-white/90">
                <thead className="bg-white/10 text-white uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Rank</th>
                    <th className="px-6 py-3">Suburb</th>
                    <th className="px-6 py-3">Majority Demographic</th>
                    <th className="px-6 py-3">Commercial Recommendations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {recs.map((recommendation, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{recommendation.suburb}</td>
                      <td className="px-6 py-4">
                        {recommendation.persona}
                      </td>
                      <td className="px-6 py-4">
                        {recommendation.business_recommendations.map((business, i) => (
                          <div
                            key={i}
                            className={cn(
                              "flex items-center space-x-2",
                              i === 0 ? "mt-2" : "mt-1"
                            )}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              {business}
                            </Button>
                          </div>
                        ))}
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
