import { useEffect, useState } from "react";
import axios from "axios";
const TopSchoolArea = () => {
    const [loading, setLoading] = useState(false)
    const [schools, setSchools] = useState(null)
    const [option, setOption] = useState(0);
    const [option1, setOption1] = useState(0);
    const [radius, setRadius] = useState(10);
    const fetchData = async () => {
        setLoading(true)
        const requestBody = {
            id: "76d3b838-5880-4320-b42f-8bd8273ab6a0",
            radius: parseInt(radius) || 10,
            district: districts[option1],
            school_type: schoolTypes[option]
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
        setLoading(false)
        setSchools(JSON.parse(response.data.top_school_area))
    }

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

    const schoolTypes = ["Secondary School", "Primary School", "Infants School"];

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
            <p>Radius(km):</p>
            <input type="text" name="radius" placeholder="Radius" onChange={e => {
                if (e.target.value !== "") {
                    setRadius(e.target.value)
                } 
            }}/>
            <button onClick={fetchData}>Fetch</button>

            {
                loading && <p>Loading...</p>
            }

            {
                schools && 
                <table className="table-auto border-collapse border border-gray-400">
                    <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">School</th>
                        <th className="border border-gray-400 px-4 py-2">Number of Properties</th>
                        <th className="border border-gray-400 px-4 py-2">Average Property Price</th>
                        <th className="border border-gray-400 px-4 py-2">Average Suburb Median Income</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schools.map((school, index) => (
                        <tr key={index}>
                        <td className="border border-gray-400 px-4 py-2">{school.school}</td>
                        <td className="border border-gray-400 px-4 py-2">{school.num_properties}</td>
                        <td className="border border-gray-400 px-4 py-2">
                            {school.avg_property_price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            })}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {school.avg_suburb_median_income.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            })}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                 </table>
            }
        </div>
    )
}

export default TopSchoolArea