import { useEffect, useState } from "react";
import axios from "axios";
const CommercialRecs = () => {
    const [loaded, setLoaded] = useState(false)
    const [recs, setRecs] = useState("")
    const fetchPrice = async () => {
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
        setRecs(response.data.recommendations)
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
                        Recommendatios:
                        {recs}
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}

export default CommercialRecs