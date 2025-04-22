import { useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel2 from "@/components/Panel2";
import Dropdown from "../components/Dropdown";

const DemoTopSchoolArea = () => {
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState(null);
  const [option, setOption] = useState(0);
  const [option1, setOption1] = useState(0);
  const [radius, setRadius] = useState(10);
  const [id, setId] = useState(null);

  const districts = [
    "Central Coast",
    "Northern Sydney",
    "South Eastern Sydney",
    "South Western Sydney",
    "Sydney",
    "Western Sydney",
    "Nepean Blue Mountains",
  ];

  const schoolTypes = ["Secondary School", "Primary School", "Infants School"];

  const fetchData = async () => {
    if (id == null) {
      alert("missing id");
      return;
    }

    const requestBody = {
      id,
      radius: parseInt(radius) || 10,
      district: districts[option1],
      school_type: schoolTypes[option],
      function_name: "top_school_area",
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/top_school_area",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSchools(JSON.parse(response.data.top_school_area));
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Panel2
        title="Schools Nearby"
        description="Find out how many properties are near a school and what the average property price is."
      >
        <p>Id:</p>
        <BasicInput
          type="text"
          name="id"
          placeholder="Id"
          onChange={(e) => setId(e.target.value || null)}
        />

        <Dropdown
          label="School level:"
          value={option}
          onChange={(e) => setOption(parseInt(e.target.value))}
          options={schoolTypes}
        />

        <Dropdown
          label="District:"
          value={option1}
          onChange={(e) => setOption1(parseInt(e.target.value))}
          options={districts}
        />

        <p>Radius (km):</p>
        <BasicInput
          type="text"
          name="radius"
          placeholder="Radius"
          onChange={(e) => setRadius(e.target.value)}
        />

        <RunButton text="Fetch" onClick={fetchData} />

        {loading && <p>Loading...</p>}

        {schools && (
          <table>
            <thead>
              <tr>
                <th>School</th>
                <th>Number of Properties</th>
                <th>Average Property Price</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school, index) => (
                <tr key={index}>
                  <td>{school.school}</td>
                  <td>{school.num_properties}</td>
                  <td>
                    {school.avg_property_price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel2>
    </div>
  );
};

export default DemoTopSchoolArea;
