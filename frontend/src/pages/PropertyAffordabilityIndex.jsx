import { useEffect, useState } from "react";
import axios from "axios";
const PropertyAffordabilityIndex = () => {
    const [loading, setLoading] = useState(false)
    const [fetched, setFetched] = useState(false)
    const [income, setIncome] = useState("32292")
    const [ret, setRet] = useState(null)

    const fetchData = async () => {
        setLoading(true)
        setFetched(true)
        const requestBody = {
            id: "76d3b838-5880-4320-b42f-8bd8273ab6a0",
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
        console.log(response)
        setLoading(false)
        setRet(response.data)
    }

    return (
        <div className="page">
            <h1>Property Affordability Index</h1>
            {loading && <p>Loading...</p>}
            {
                !fetched && <>
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
                  <table className="table-auto w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Suburb</th>
                        <th className="border px-4 py-2">Normalized Affordability Index</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ret.map((recommendation, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{recommendation.suburb}</td>
                          <td className="border px-4 py-2">{recommendation.norm_affordability_index}</td>
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