import { useEffect, useState } from "react";
import axios from "axios";
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
    <div className="page">
      <h1>Investment Potential</h1>
      <p>Id:</p>
      <input
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
      <button onClick={fetchData}>Submit</button>
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
