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
        setInvestPotential(response.data.investment_potentials)
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
                        Investment potiential:
                        {investPotential}
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}

export default InvestmentPotential