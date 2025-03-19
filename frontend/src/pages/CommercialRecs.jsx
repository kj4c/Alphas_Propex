import { useEffect, useState } from "react";
import axios from "axios";
const CommercialRecs = () => {
    const [loaded, setLoaded] = useState(false)
    const [recs, setRecs] = useState("")
    const fetchPrice = async () => {
        setLoaded(false)
        const requestBody = {
            id: "76d3b838-5880-4320-b42f-8bd8273ab6a0",
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
        setLoaded(true)
        setRecs(JSON.parse(response.data.recommendations))
    }

    useEffect(() => {
        fetchPrice()
    }, [])
    return (
        <div className="page">
            <h1>Commercial Recommendations</h1>
            {
                loaded ? (
                    <div className="recs">
                        <table className="table-auto w-full border-collapse">
                            <thead>
                            <tr>
                                <th className="border px-4 py-2">Suburb</th>
                                <th className="border px-4 py-2">Median Income</th>
                                <th className="border px-4 py-2">Population Density</th>
                            </tr>
                            </thead>
                            <tbody>
                            {recs.map((recommendation, index) => (
                                <tr key={index}>
                                <td className="border px-4 py-2">{recommendation.suburb}</td>
                                <td className="border px-4 py-2">{recommendation.suburb_median_income}</td>
                                <td className="border px-4 py-2">{recommendation.population_density}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}

export default CommercialRecs