import { useEffect, useState } from "react";
import axios from "axios";
const PropertyAffordabilityIndex = () => {
    const [loading, setLoading] = useState(false)
    const [fetched, setFetched] = useState(false)
    const [income, setIncome] = useState("32292")
    const [ret, setRet] = useState(null)
    const [id, setId] = useState(null)

    const fetchData = async () => {
        if (id == null) {
          alert("missing id")
          return
        }
        setLoading(true)
        setFetched(true)
        const requestBody = {
            id: id,
            income: parseInt(income)
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
        setLoading(false)
        setRet(response.data)
    }

    return (
        <div className="page">
            <h1>Property Affordability Index</h1>
            {loading && <p>Loading...</p>}
            {
                !fetched && <>
                    <p>Id:</p>
                    <input type="text" name="id" placeholder="Id" onChange={e => {
                        if (e.target.value !== "") {
                            setId(e.target.value)
                        } else {
                            setId(null)
                        }
                    }}/>
                    <p>Income:</p>
                    <input type="text" name="income" placeholder="Income" onChange={e => {
                        if (e.target.value !== "") {
                            setIncome(e.target.value)
                        }
                    }}/>
                    <button onClick={fetchData}>Fetch</button>
                </>
            }
            {
               ret !== null && (
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
              )
            }
        </div>
    )
}

export default PropertyAffordabilityIndex