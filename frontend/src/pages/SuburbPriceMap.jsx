import { useEffect, useState } from "react";
import axios from "axios";
const SuburbPriceMap = () => {
    const [loaded, setLoaded] = useState(false)
    const [map, setMap] = useState("")
    const fetchData = async () => {
        const requestBody = {
            id: "76d3b838-5880-4320-b42f-8bd8273ab6a0",
        };

        const response = await axios.post(
            "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/suburb_price_map",
            requestBody,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        );
        setLoaded(true)
        setMap(response.data)
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="page">
            <h1>Suburb Price Map</h1>
            {
                loaded ? (
                    <div className="suburbMap">
                        Suburb map:
                        {map}
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}

export default SuburbPriceMap