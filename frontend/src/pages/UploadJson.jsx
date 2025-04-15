import React, { useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";

const UploadJson = () => {
  const [file, setFile] = useState(null);
  const [ret, setRet] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a JSON file first!");
      return;
    }
    setLoading(true)

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const jsonObject = JSON.parse(e.target.result);

        const url = "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/upload_json";

        const response = await axios.post(url, jsonObject, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setRet(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file. Please ensure it is a valid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="page">
        <h1>Upload JSON file</h1>
        <input
            className="cursor-pointer"
            type="file"
            accept=".json"
            onChange={handleFileChange}
        />
        <RunButton text="Upload" onClick={handleUpload}/>
        {
            loading && <p>Loading...</p>
        }
        {
            ret != null && <>
                <h3>{ret.message}</h3>
                <h4>Upload URL</h4>
                <p>{ret.upload_url}</p>
                <h4>Data ID</h4>
                <p>{ret.data_id}</p>
            </>
        }
    </div>
  );
};

export default UploadJson;
