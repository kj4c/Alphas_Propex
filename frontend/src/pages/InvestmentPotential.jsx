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
    setInvestPotential(JSON.parse(response.data.investment_potentials));
  };

  return (
    <div className="page mx-auto w-full max-w-[95vw] px-6 py-10 flex flex-col gap-6">
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
      </Panel>
      {investPotential !== null && (
        <div className="investPotential">
          <table>
            <thead>
              <tr>
                <th>Suburb</th>
                <th>Investment Score</th>
              </tr>
            </thead>
            <tbody>
              {investPotential.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.suburb}</td>
                  <td>{entry.investment_score.toFixed(2)}</td>
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

export default InvestmentPotential;
