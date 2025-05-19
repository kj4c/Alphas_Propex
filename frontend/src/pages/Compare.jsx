import { useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import SuburbPanel from "@/components/Panel3";
import { ArrowUpRight, Shield, Home, DollarSign, BarChart2, Smile } from "lucide-react";


// Compare Suburbs Panels
const metrics = [
  { key: 'medianPrice', label: 'Average Property Price' },
  { key: 'crimeRate', label: 'Weighted Crime Rate' },
  { key: 'investmentScore', label: 'Investment Potential Score' },
  { key: 'commercialScore', label: 'Commercial Score' },
  { key: 'affordabilityIndex', label: 'Property Affordability Index' },
  { key: 'livabilityScore', label: 'Suburb Livability Score' }
];

const metricIcons = {
  investmentScore: <ArrowUpRight className="w-20 h-20 text-green-400" />,
  commercialScore: <Home className="w-30 h-30 text-blue-400" />,
  crimeRate: <Shield className="w-20 h-20 text-white" />,
  affordabilityIndex: <BarChart2 className="w-20 h-20 text-purple-400" />,
  livabilityScore: <Smile className="w-20 h-20 text-white" />
};

const results = [
  {
    name: 'Hornsby',
    investmentScore: 73.94,
    commercialScore: 74.23,
    medianPrice: '$780,000',
    crimeRate: '4.29',
    affordabilityIndex: '6.14',
    livabilityScore: 68.32,
  },
  {
    name: 'Bondi',
    investmentScore: 76,
    commercialScore: 81,
    medianPrice: '$720,000',
    crimeRate: '23.72',
    affordabilityIndex: '4.21',
    livabilityScore: 53.18,
  },
  {
    name: 'Artarmon',
    investmentScore: 89,
    commercialScore: 68,
    medianPrice: '$850,000',
    crimeRate: '6.66',
    affordabilityIndex: '9.52',
    livabilityScore: 66.85,
  }
];

const Compare = () => {
  const [id, setId] = useState(null);
  const [compare, setCompare] = useState(null)
  const [suburb1, setSuburb1] = useState("");
  const [suburb2, setSuburb2] = useState("");
  const [suburb3, setSuburb3] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!suburb1 || !suburb2 || !suburb3) {
      alert("missing suburb");
      return;
    }
    // const requestBody = {
    //   id: id,
    //   function_name: "investment_potential",
    //   top_n: topN
    // };
    setLoading(true);
    // const response = await axios.post(
    //   "https://7c4yt1yrr2.execute-api.us-east-1.amazonaws.com/investment_potential",
    //   requestBody,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // console.log("response = ", response.data.investment_potentials);
    //setCompare(response.data.investment_potentials);
    setCompare(results)
    setLoading(false)
  }

  return (
    <div>
      <SuburbPanel title="Select suburbs to compare">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <BasicInput
          type="text"
          name="suburb1"
          placeholder="Suburb"
          onChange={(e) => setSuburb1(e.target.value)}
        />
        <BasicInput
          type="text"
          name="suburb2"
          placeholder="Suburb"
          onChange={(e) => setSuburb2(e.target.value)}
        />
        <BasicInput
          type="text"
          name="suburb3"
          placeholder="Suburb"
          onChange={(e) => setSuburb3(e.target.value)}
        />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <RunButton text={"Submit"} onClick={fetchData} />
      )}
      {compare && !loading && (
        <div>
          <div className="grid grid-cols-3 gap-30 overflow-visible">
          {results.map((suburb, i) => (
            <div key={i} className="text-white text-center pl-4">
              <p className="sticky top-10 bg-[linear-gradient(to_top_right,rgba(24,44,88,0.4)_13.2%,rgba(227,228,252,0.02)_100%)] text-4xl font-bold py-10 z-10 my-20 rounded-2xl">
                {suburb.name}
              </p>
              {metrics.map((metric) => (
                <div key={metric.key} className="mb-6">
                  <div className="flex justify-center mb-5">{metricIcons[metric.key]}</div>
                  <p className="text-7xl font-semibold mb-2">{suburb[metric.key]}</p>
                  <p className="text-3xl mb-30">{metric.label}</p>   
                </div>
              ))}
            </div>
          ))}
          </div>
        </div>
      )}
      </SuburbPanel>
    </div>
  );
};

export default Compare;
