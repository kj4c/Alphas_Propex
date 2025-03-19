import { useEffect, useState } from "react";
import axios from "axios";
const InfluenceFactor = () => {
    const [loaded, setLoaded] = useState(false)
    const [factor, setFactor] = useState("")
    const fetchData = async () => {
        setLoaded(false)
        const requestBody = {
            id: "76d3b838-5880-4320-b42f-8bd8273ab6a0",
        };

        const response = await axios.post(
            "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/influence_factor",
            requestBody,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        );
        setLoaded(true)
        setFactor(JSON.parse(response.data.recommendations))
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="page">
            <h1>Influence Factor</h1>
            {
                loaded ? (
                    <div className="investPotential">
                        Investment potiential:
                        {factor}
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}

export default InfluenceFactor