import { useEffect, useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";

const PropertyAffordabilityIndex = () => {
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [income, setIncome] = useState("32292");
  const [ret, setRet] = useState(null);
  const [id, setId] = useState(null);

  const fetchData = async () => {
    if (id == null) {
      alert("missing id");
      return;
    }
    setLoading(true);
    setFetched(true);
    const requestBody = {
      id: id,
      income: parseInt(income),
      function_name: "property_affordability_index",
    };

    const response = await axios.post(
      "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/property_affordability_index",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    setRet(response.data);
  };

  return (
    <div className="page mx-auto w-full max-w-[95vw] px-6 py-10 flex flex-col gap-6">
      <Panel
        title="Property Affordability Index"
        description={"How affordable each suburb is based on given income"}
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
        <BasicInput
          type="text"
          name="income"
          placeholder="Income"
          onChange={(e) => {
            if (e.target.value !== "") {
              setIncome(e.target.value);
            }
          }}
        />
        <RunButton text="Fetch" onClick={fetchData}/>
      </Panel>
      {ret !== null && (
        <div className="ret">
          <table>
            <thead>
              <tr>
                <th>Suburb</th>
                <th>Normalized Affordability Index</th>
              </tr>
            </thead>
            <tbody>
              {ret.map((recommendation, index) => (
                <tr key={index}>
                  <td>{recommendation.suburb}</td>
                  <td>{recommendation.norm_affordability_index}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PropertyAffordabilityIndex;
