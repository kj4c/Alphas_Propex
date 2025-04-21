import { useEffect, useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
const InvestmentPotential = () => {
  const [loading, setLoading] = useState(false);
  const [investPotential, setInvestPotential] = useState(null);
  const [id, setId] = useState(null);

  const fetchData = async () => {
    if (id == null) {
      alert("missing id");
      return;
    }
    const requestBody = {
      id: id,
      function_name: "investment_potential",
    };
    setLoading(true);
    const response = await axios.post(
      "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/investment_potential",
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
        title="Investment Potential"
        description={"Which suburbs yield the highest investment potential"}
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
        <RunButton text="Submit" onClick={fetchData}/>
        {investPotential !== null && (
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
      {loading && <p>Loading...</p>}
      </Panel>
    </div>
  );
};

export default InvestmentPotential;
