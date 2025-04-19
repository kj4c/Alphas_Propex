import { useEffect, useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
const SuburbLivability = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ret, setRet] = useState(null);
  const [weight, setWeight] = useState(0.5);
  const [sizeWeight, setSizeWeight] = useState(0.3);
  const [density, setDensity] = useState(0.2);
  const [id, setId] = useState(null);
  const fetchData = async () => {
    if (id == null) {
      alert("missing id");
      return;
    }
    setLoading(true);
    const requestBody = {
      id: id,
      proximity_weight: parseFloat(weight) || 0.5,
      property_size_weight: parseFloat(sizeWeight) || 0.3,
      population_density_weight: parseFloat(density) || 0.2,
      function_name: "suburb_livability_score",
    };

    const response = await axios.post(
      "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/suburb_livability_score",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    setLoaded(true);
    setRet(response.data);
  };

  return (
    <div>
      <Panel
        title="Suburb Livability Score"
        description="Calculates livability score given weightings of proximity to CBD, property size, and population density"
      >
        {!loaded ? (
          <div>
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
              name="weight"
              placeholder="Proximity weight"
              onChange={(e) => {
                if (e.target.value !== "") {
                  setWeight(e.target.value);
                }
              }}
            />
            <BasicInput
              type="text"
              name="weight"
              placeholder="Property size weight"
              onChange={(e) => {
                if (e.target.value !== "") {
                  setSizeWeight(e.target.value);
                }
              }}
            />
            <BasicInput
              type="text"
              name="weight"
              placeholder="Population density weight"
              onChange={(e) => {
                if (e.target.value !== "") {
                  setDensity(e.target.value);
                }
              }}
            />
            <RunButton onClick={fetchData} text={"Submit"}></RunButton>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Suburb</th>
                <th>Livability Score</th>
              </tr>
            </thead>
            <tbody>
              {ret.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.suburb}</td>
                  <td>{entry.livability_score.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {loading && <p>Loading...</p>}
      </Panel>
    </div>
  );
};

export default SuburbLivability;
