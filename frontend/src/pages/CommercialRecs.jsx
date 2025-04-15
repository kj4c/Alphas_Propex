import { useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Panel from "@/components/Blocks";

const CommercialRecs = () => {
  const [id, setId] = useState(null);
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
    };

    const response = await axios.post(
      "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/commercial_recs",
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
    <div className="page mx-auto w-full max-w-[95vw] px-6 py-10 flex flex-col gap-6">
      <Panel
        title={"Commercial Recommendations"}
        description={"Find the best suburbs for commercial use"}
      >
        <BasicInput
          type="text"
          name="id"
          placeholder="Id"
          onChange={(e) => setId(e.target.value || null)}
        />
        <RunButton text={"Submit"} onClick={fetchPrice} />
      </Panel>

      {recs !== null && (
        <div className="recs">
          <table>
            <thead>
              <tr>
                <th>Suburb</th>
                <th>Median Income</th>
                <th>Population Density</th>
              </tr>
            </thead>
            <tbody>
              {recs.map((recommendation, index) => (
                <tr key={index}>
                  <td>{recommendation.suburb}</td>
                  <td>{recommendation.suburb_median_income}</td>
                  <td>{recommendation.population_density}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default CommercialRecs;
