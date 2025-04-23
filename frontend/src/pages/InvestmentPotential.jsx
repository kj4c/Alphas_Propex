import { useEffect, useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
import Loading from "@/components/Loading";
const InvestmentPotential = () => {
  const [loading, setLoading] = useState(false);
  const [investPotential, setInvestPotential] = useState(null);
  const [id, setId] = useState(null);
  const [topN, setTopN] = useState(null);

  const fetchData = async () => {
    if (id == null) {
      alert("missing id");
      return;
    }
    const requestBody = {
      id: id,
      function_name: "investment_potential",
      top_n: topN
    };
    setLoading(true);
    const response = await axios.post(
      "https://7c4yt1yrr2.execute-api.us-east-1.amazonaws.com/investment_potential",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    console.log("response = ", response.data.investment_potentials);
    setInvestPotential(response.data.investment_potentials);
  };

  return (
    <div>
      <Panel
        title="Investment Potentials"
        description={"Explore suburbs with high investment potential based on property price growth, rental yield, location demand and affordability."}
        loading={loading}
      >
        <BasicInput
          type="text"
          name="id"
          placeholder="Dataset ID"
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
          name="top_n"
          placeholder="Number of Recommendations"
          onChange={(e) => {
            if (e.target.value !== "") {
              setTopN(e.target.value);
            } else {
              setTopN(null);
            }
          }}
        />
         {loading ? (
          <Loading />
        ) : (
          <RunButton text={"Submit"} onClick={fetchData} />
        )}
        {investPotential !== null && !loading  && (
        <div className="w-full flex justify-center overflow-x-auto rounded-lg border border-white/20 backdrop-blur-sm">
          <table className="min-w-full text-sm text-left text-white/90">
            <thead className="bg-[--color-gray-800] text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3">Suburb</th>
                <th className="px-6 py-3">Investment Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {investPotential.map((entry, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">{entry.suburb}</td>
                  <td className="px-6 py-4">{entry.investment_score.toFixed(2)}</td>
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

export default InvestmentPotential;
