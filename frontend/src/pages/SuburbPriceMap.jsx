import { useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
import Loading from "@/components/Loading";
const SuburbPriceMap = () => {
  const [loading, setLoading] = useState(false);
  const [ret, setRet] = useState(null);

  const getId = () => {
    const storedId = localStorage.getItem('id');
    if (!storedId) return "76d3b838-5880-4320-b42f-8bd8273ab6a0"; // fallback to 'Default'

    return storedId;
  };
  const fetchData = async () => {
    const id = getId()
    if (id == null) {
      alert("missing id");
      return;
    }
    setLoading(true);
    const requestBody = {
      id: id,
      function_name: "suburb_price_map",
    };

    const response = await axios.post(
      "https://7c4yt1yrr2.execute-api.us-east-1.amazonaws.com/suburb_price_map",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    console.log(response);
    setRet(response.data);
  };

  return (
    <div>
      <Panel
        title="Suburb Median Prices"
        loading={loading}
        description={
          "Visualise property prices with a heatmap of the median prices of properties in each Sydney Suburb"
        }
      >
        {!ret ? (
          <>
            {loading ? (
              <Loading />
            ) : (
              <RunButton text={"Generate map"} onClick={fetchData} />
            )}
          </>
        ) : (
          <div
            className="w-[80%] h-fit overflow-auto border rounded-lg shadow p-10 bg-[#1e1a36]"
            dangerouslySetInnerHTML={{ __html: ret }}
          />
        )}
      </Panel>
    </div>
  );
};

export default SuburbPriceMap;
