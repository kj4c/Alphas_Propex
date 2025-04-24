import { useEffect, useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";

const InfluenceFactor = () => {
  const [loading, setLoading] = useState(false);
  const [factor, setFactor] = useState(null);
  const [id, setId] = useState(null);
  const [targetCol, setTargetCol] = useState(null);
  const [filterCol, setFilterCol] = useState(null);
  const [filterVal, setFilterVal] = useState(null);
  const [dropCol, setDropCol] = useState(null);
  const fetchData = async () => {
    if (id === null) {
      alert("missing id");
      return;
    }
    setLoading(false);
    const requestBody = {
      id: "76d3b838-5880-4320-b42f-8bd8273ab6a0",
      function_name: "influence_factors",
      target_column: targetCol,
      filter_column: filterCol,
      filter_value: filterVal,
      drop_columns: (dropCol ?? "")
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
    };

    const response = await axios.post(
      "https://7c4yt1yrr2.execute-api.us-east-1.amazonaws.com/influence_factor",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(true);
    console.log("response = ", response.data);
    setFactor(JSON.parse(response.data.recommendations));
  };

  return (
    <div className="page">
      <Panel
        title="Influence Factors"
        description="Provides a ranked list of real estate features effecting the target variable (from most impactful to least impactful)"
        loading={loading}
      >
        <BasicInput
          type="text"
          name="id"
          placeholder="Id"
          onChange={(e) => {
            if (e.target.value !== "") {
              setId(e.target.value);
            } else {
              setId(null);
            }
          }}
        />
        <BasicInput
          type="text"
          name="id"
          placeholder="Target Column"
          onChange={(e) => {
            if (e.target.value !== "") {
              setTargetCol(e.target.value);
            } else {
              setTargetCol(null);
            }
          }}
        />
        <BasicInput
          type="text"
          name="id"
          placeholder="Filter Column"
          onChange={(e) => {
            if (e.target.value !== "") {
              setFilterCol(e.target.value);
            } else {
              setFilterCol(null);
            }
          }}
        />
        <BasicInput
          type="text"
          name="id"
          placeholder="Filter Value"
          onChange={(e) => {
            if (e.target.value !== "") {
              setFilterVal(e.target.value);
            } else {
              setFilterVal(null);
            }
          }}
        />
        <BasicInput
          type="text"
          name="id"
          placeholder="Drop Columns"
          onChange={(e) => {
            if (e.target.value !== "") {
              setDropCol(e.target.value);
            } else {
              setDropCol(null);
            }
          }}
        />
        {loading ? (
          <Loading />
        ) : (
          <RunButton text={"Submit"} onClick={fetchData} />
        )}
      </Panel>
    </div>
  );
};

export default InfluenceFactor;
