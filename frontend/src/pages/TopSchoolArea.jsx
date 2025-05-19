import { useState, useMemo } from "react";
import axios from "axios";

import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
import Dropdown from "../components/Dropdown";
import Loading from "@/components/Loading";
import SortableHeader from "@/components/SortableHeader";
const TopSchoolArea = () => {
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState(null);

  const [schoolTypeIndex, setSchoolTypeIndex] = useState(0);
  const [districtIndex, setDistrictIndex] = useState(0);
  const [radius, setRadius] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "avg_property_price", direction: "desc" });

  const schoolTypes = ["Secondary School", "Primary School", "Infants School"];
  const districts = [
    "Central Coast",
    "Northern Sydney",
    "South Eastern Sydney",
    "South Western Sydney",
    "Sydney",
    "Western Sydney",
    "Nepean Blue Mountains",
  ];

  const getId = () => {
    const storedId = localStorage.getItem('id');
    if (!storedId) return "76d3b838-5880-4320-b42f-8bd8273ab6a0";

    return storedId;
  };
  const fetchData = async () => {
    const id = getId();
    if (!id) {
      alert("Please enter a valid ID.");
      return;
    }

    const requestBody = {
      id,
      radius: parseInt(radius) || 10,
      district: districts[districtIndex],
      school_type: schoolTypes[schoolTypeIndex],
      function_name: "top_school_area",
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "https://7c4yt1yrr2.execute-api.us-east-1.amazonaws.com/top_school_area",
        requestBody,
        { headers: { "Content-Type": "application/json" } }
      );
      const data = JSON.parse(response.data.top_school_area);
      setSchools(data);
    } catch (error) {
      console.error("API error:", error);
      alert("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  const sortedSchools = useMemo(() => {
    if (!schools) return [];
    const sorted = [...schools];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [schools, sortConfig]);

  return (
    <div className="page">
      <Panel
        title="Schools Nearby"
        description="Check top schools accessibility and property prices in educational hotspots for your family."
        loading={loading}
      >
        {/* School Level Dropdown */}
        <Dropdown
          className="mb-4 text-white/90"
          label="School Level"
          value={schoolTypeIndex}
          onChange={(e) => setSchoolTypeIndex(parseInt(e.target.value))}
          options={schoolTypes}
        />

        {/* District Dropdown */}
        <Dropdown
          label="District"
          value={districtIndex}
          onChange={(e) => setDistrictIndex(parseInt(e.target.value))}
          options={districts}
        />

        {/* Radius Input */}
        <BasicInput
          type="text"
          name="radius"
          placeholder="Radius (km)"
          onChange={(e) => setRadius(e.target.value)}
        />

        {/* Run Button or Loading */}
        {loading ? <Loading /> : <RunButton text="Submit" onClick={fetchData} />}

        {/* Results Table */}
        {schools && (
          <div className="w-full overflow-x-auto rounded-lg border border-white/20 backdrop-blur-sm mt-6">
            <table className="min-w-full text-sm text-left text-white/90">
              <thead className="bg-white/10 text-white uppercase text-xs tracking-wider">
                <tr>
                  <SortableHeader
                    label="School"
                    field="school"
                    sortConfig={sortConfig}
                    onClick={handleSort}
                  />
                  <SortableHeader
                    label="Number of Properties"
                    field="num_properties"
                    sortConfig={sortConfig}
                    onClick={handleSort}
                  />
                  <SortableHeader
                    label="Average Property Price"
                    field="avg_property_price"
                    sortConfig={sortConfig}
                    onClick={handleSort}
                  />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {sortedSchools.map((school, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
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
