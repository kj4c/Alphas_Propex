import { useEffect, useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
import Loading from "@/components/Loading";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const InvestmentPotential = () => {
  const [loading, setLoading] = useState(false);
  const [investPotential, setInvestPotential] = useState(null);
  const [id, setId] = useState(null);
  const [topN, setTopN] = useState(null);

  const fetchData = async () => {
    if (id == null) {
      alert("missing id");
      return;
    }
    const requestBody = {
      id: id,
      function_name: "investment_potential",
      top_n: topN
    };
    setLoading(true);
    const response = await axios.post(
      "https://7c4yt1yrr2.execute-api.us-east-1.amazonaws.com/investment_potential",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    console.log("response = ", response.data.investment_potentials);
    setInvestPotential(response.data.investment_potentials);
  };

  const chartData = investPotential?.map((i) => ({
    suburb: i.suburb,
    score: +i.investment_score.toFixed(2),
  }));

  return (
    <div>
      <Panel
        title="Investment Potentials"
        description={"Explore suburbs with high investment potential based on property price growth, rental yield, location demand and affordability."}
        subDescriptionLabel={"How we score suburbs"}
        subDescriptionItems={[
          "Property Inflation Index — 40%",
          "Rental Yield (30% of median income) — 30%",
          "Distance from CBD — 20%",
          "Affordability (median income ÷ price) — 10%",
        ]}
        loading={loading}
      >
        <BasicInput
          type="text"
          name="id"
          placeholder="Dataset ID"
          onChange={(e) => {
            if (e.target.value !== "") {
              setId(e.target.value);
            } else {
              setId(null);
            }
          }}
        />
        <BasicInput
          type="number"
          name="top_n"
          placeholder="Number of Recommendations"
          onChange={(e) => setTopN(parseInt(e.target.value) || 10)}
        />  
         {loading ? (
          <Loading />
        ) : (
          <RunButton text={"Submit"} onClick={fetchData} />
        )}
        {investPotential !== null && !loading  && (
          <div className="rec w-full">
          <div className="w-full flex justify-center overflow-x-auto rounded-lg border border-white/20 backdrop-blur-sm">
            <table className="min-w-full text-[18px] text-center text-white/90 mt-4 mb-4">
              <thead className="bg-[--color-gray-800] text-white uppercase text-[18px] tracking-wider">
                <tr>
                  <th className="px-6 py-3">Rank</th>
                  <th className="px-6 py-3">Suburb</th>
                  <th className="px-6 py-3">Investment Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {investPotential.map((entry, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-40 py-4 font-bold">{entry.suburb}</td>
                    <td className="px-6 py-4 font-bold">{entry.investment_score.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full h-96 mt-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="suburb" angle={-45} textAnchor="end" height={100} tick={{ fill: '#ffffff' }} />
            <YAxis
              label={{
                value: "Investment Score",
                angle: -90,
                position: "insideLeft",
                fill: '#ffffff'
              }}
              tick={{ fill: '#ffffff' }}
            />
            <Tooltip />
            <Bar dataKey="score" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        </div>   
        </div>
      )}
      </Panel>
    </div>
  );
};

export default InvestmentPotential;
