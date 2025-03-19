import { useEffect, useState } from "react";
import axios from "axios";
const SuburbLivability = () => {
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ret, setRet] = useState(null)
    const [weight, setWeight] = useState(0.5);
    const [sizeWeight, setSizeWeight] = useState(0.3);
    const [density, setDensity] = useState(0.2);
    const fetchData = async () => {
        setLoading(true)
        const requestBody = {
            id: "76d3b838-5880-4320-b42f-8bd8273ab6a0",
            proximity_weight: parseFloat(weight) || 0.5,
            property_size_weight: parseFloat(sizeWeight) || 0.3,
            population_density_weight: parseFloat(density) ||0.2
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
        setLoading(false)
        setLoaded(true)
        setRet(response.data)
    }

    
    return (
        <div className="page">
            <h1>Suburb Livability Score</h1>
            {
                !loaded ? (<div className="input-form">
                    <p>Proximity weight:</p>
                    <input type="text" name="weight" placeholder="Proximity weight" onChange={e => {
                        if (e.target.value !== "") {
                            setWeight(e.target.value)
                        }
                    }}/>
                    <p>Property size weight:</p>
                    <input type="text" name="weight" placeholder="Property size weight" onChange={e => {
                        if (e.target.value !== "") {
                            setSizeWeight(e.target.value)
                        }
                    }}/>
                    <p>Population density weight:</p>
                    <input type="text" name="weight" placeholder="Population density weiggt" onChange={e => {
                        if (e.target.value !== "") {
                            setDensity(e.target.value)
                        }
                    }}/>
                    <button onClick={fetchData}>Submit</button>
                </div>):(
                    <table className="table-auto border-collapse border border-gray-400">
                        <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">Suburb</th>
                            <th className="border border-gray-400 px-4 py-2">Livability Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ret.map((entry, index) => (
                            <tr key={index}>
                            <td className="border border-gray-400 px-4 py-2">{entry.suburb}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                {entry.livability_score.toFixed(2)}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                  </table>
                )
            }

            {
                loading && <p>Loading...</p>
            }
            
        </div>
    )
}

export default SuburbLivability