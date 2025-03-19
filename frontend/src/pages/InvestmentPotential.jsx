import { useEffect, useState } from "react";
import axios from "axios";
const InvestmentPotential = () => {
    const [loaded, setLoaded] = useState(false)
    const [investPotential, setInvestPotential] = useState("")
    const fetchData = async () => {
        const requestBody = {
            id: "76d3b838-5880-4320-b42f-8bd8273ab6a0",
        };

        const response = await axios.post(
            "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/investment_potential",
            requestBody,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        );
        setLoaded(true)
        setInvestPotential(JSON.parse(response.data.investment_potentials))
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="page">
            <h1>Investment Potential</h1>
            {
                loaded ? (
                    <div className="investPotential">
                        <table className="table-auto border-collapse border border-gray-400">
                            <thead>
                            <tr>
                                <th className="border border-gray-400 px-4 py-2">Suburb</th>
                                <th className="border border-gray-400 px-4 py-2">Investment Score</th>
                            </tr>
                            </thead>
                            <tbody>
                            {investPotential.map((entry, index) => (
                                <tr key={index}>
                                <td className="border border-gray-400 px-4 py-2">{entry.suburb}</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {entry.investment_score.toFixed(2)}
                                </td>
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

export default InvestmentPotential