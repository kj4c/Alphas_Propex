import { useEffect, useState } from "react";
import axios from "axios";
const TopSchoolArea = () => {
    const [loaded, setLoaded] = useState(false)
    const [schools, setSchools] = useState("")
    const [option, setOption] = useState(0);
    const [option1, setOption1] = useState(0);
    const fetchData = async () => {
        const requestBody = {
            id: "76d3b838-5880-4320-b42f-8bd8273ab6a0",
        };

        const response = await axios.post(
            "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/top_school_area",
            requestBody,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        );
        setLoaded(true)
        setSchools(response.data.top_school_area)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const districts = [
        "Central Coast", 
        "Hunter New England", 
        "Illawarra Shoalhaven", 
        "Mid North Coast", 
        "Murrumbidgee", 
        "Northern NSW", 
        "Northern Sydney", 
        "South Eastern Sydney", 
        "South Western Sydney", 
        "Sydney", 
        "Western Sydney", 
        "Nepean Blue Mountains", 
        "Far West", 
        "Western NSW", 
        "Southern NSW"
    ]

    return (
        <div className="page">
            <h1>TopSchoolArea</h1>
            <select
                id="type-dropdown"
                value={option}
                onChange={(e) => {
                setOption(parseInt(e.target.value));
                }}
            >
                <option value="0">Secondary School</option>
                <option value="1">Primary School</option>
                <option value="2">Infant School</option>
            </select>
            <select
                id="district-dropdown"
                value={option1}
                onChange={(e) => {
                    setOption1(parseInt(e.target.value));
                }}
            >
                {districts.map((district, index) => (
                    <option key={index} value={index}>
                        {district}
                    </option>
                ))}
            </select>

            {
                loaded ? (
                    <div className="schoolsArea">
                        Top School Areas
                        {schools}
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}

export default TopSchoolArea