import { useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
import Dropdown from "../components/Dropdown";
import Loading from "@/components/Loading";
const TopSchoolArea = () => {
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
        "https://7c4yt1yrr2.execute-api.us-east-1.amazonaws.com/top_school_area",
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
      <Panel
        title="Schools Nearby"
        description="Check top schools accessibility and property prices in educational hotspots for your family."
        loading={loading}
      >
        <BasicInput
          type="text"
          name="id"
          placeholder="Id"
          onChange={(e) => setId(e.target.value || null)}
        />

        <Dropdown
          className="mb-4 text-white/90"
          label="School Level"
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

        <BasicInput
          type="text"
          name="radius"
          placeholder="Radius (km)"
          onChange={(e) => setRadius(e.target.value)}
        />

        {loading ? (
          <Loading />
        ) : (
          <RunButton text={"Submit"} onClick={fetchData} />
        )}

        {schools && (
          <div className="w-full overflow-x-auto rounded-lg border border-white/20 backdrop-blur-sm">
            <table className="min-w-full text-sm text-left text-white/90">
              <thead className="bg-white/10 text-white uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3">School</th>
                  <th className="px-6 py-3">Number of Properties</th>
                  <th className="px-6 py-3">Average Property Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {schools.map((school, index) => (
                  <tr
                    key={index}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">{school.school}</td>
                    <td className="px-6 py-4">{school.num_properties}</td>
                    <td className="px-6 py-4">
                      {school.avg_property_price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
};

export default TopSchoolArea;
