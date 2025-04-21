import React, { useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import { motion } from "framer-motion";

const UploadJson = () => {
  const [file, setFile] = useState(null);
  const [ret, setRet] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a JSON file first!");
      return;
    }

    setLoading(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const jsonObject = JSON.parse(e.target.result);
        const url =
          "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/upload_json";

        const response = await axios.post(
          url,
          { function_name: "upload_json" },
          { headers: { "Content-Type": "application/json" } }
        );

        await axios.put(response.data.upload_url, jsonObject, {
          headers: { "Content-Type": "application/json" },
        });

        setRet(response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert(
          "Error uploading file. Please ensure it is a valid JSON file."
        );
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4 text-center text-white">
      <motion.h1
        className="text-5xl font-semibold mb-10 max-w-2xl leading-snug"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        To get started, please upload a JSON file
      </motion.h1>
      <p1>
        If you do not have a file to upload, please use our pre-existing datasets.
      </p1>
      <p1 className= "mb-4">
        Large Data Set 2016-2022, over 30,000 property sales records: <span className="font-mono text-purple-400">
          76d3b838-5880-4320-b42f-8bd8273ab6a0
        </span>
        <br></br>
        Small Data Set, 20 property sales records: <span className="font-mono text-purple-400">
          34c762a2-e1cd-44a7-a9ea-56f22d64989e
        </span>
      </p1>

      <label
        htmlFor="json-upload"
        className="inline-block cursor-pointer rounded-xl border border-[#c8c8c8] bg-[#010314] text-[#c8c8c8] px-10 py-6 mb-6 text-lg transition hover:text-white hover:border-white focus:outline-none focus:ring-2 focus:ring-[#466fba]"
      >
        {file ? `Selected: ${file.name}` : "Upload JSON File"}
        <input
          id="json-upload"
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>


      <div className="w-full max-w-sm">
        <RunButton text="Upload" onClick={handleUpload} className="w-full py-4 text-lg" />
      </div>

      {loading && (
        <p className="mt-6 text-base text-gray-400">
          Uploading, please wait...
        </p>
      )}

      {ret && (
        <motion.div
          className="mt-10 bg-[#020522] border border-white/20 rounded-lg p-6 w-full max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-xl font-semibold mb-2">
            ✅ Successfully uploaded JSON to the S3 Bucket
          </h3>
          <h4 className="text-lg text-purple-300 mb-1">Your Data ID:</h4>
          <p className="font-mono text-purple-400">{ret.data_id}</p>
          <p className="text-sm mt-2 text-gray-400">
            Please save this ID as we will not show it again!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default UploadJson;
