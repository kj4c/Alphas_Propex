import { useEffect, useState } from "react";
import axios from "axios";
const InfluenceFactor = () => {
    const [loading, setLoading] = useState(false)
    const [factor, setFactor] = useState(null)
    const [id, setId] = useState(null)
    const fetchData = async () => {
        if (id === null) {
            alert("missing id")
            return
        }
        setLoading(false)
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
        setLoading(true)
        setFactor(JSON.parse(response.data.recommendations))
    }

    return (
        <div className="page">
            <h1>Commercial Recommendations</h1>
            <p>Id:</p>
            <input type="text" name="id" placeholder="Id" onChange={e => {
                if (e.target.value !== "") {
                    setId(e.target.value)
                } else {
                    setId(null)
                }
            }}/>
            <button onClick={fetchData}>Submit</button>
            <h1>Influence Factor</h1>
            {
                loading && <p>Loading...</p>
            }
            {
                factor !== null && {factor}
            }
        </div>
    )
}

export default InfluenceFactor