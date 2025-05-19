

const mockData = [
    {
      name: 'Hornsby',
      investmentScore: 82,
      commercialScore: 74,
      medianPrice: '$780,000',
      crimeRate: 'Low (3.2/10)',
      affordabilityIndex: '6.5',
      livabilityScore: 88,
    },
    {
      name: 'Bondi',
      investmentScore: 76,
      commercialScore: 81,
      medianPrice: '$720,000',
      crimeRate: 'Moderate (5.1/10)',
      affordabilityIndex: '7.2',
      livabilityScore: 80,
    },
    {
      name: 'Artarmon',
      investmentScore: 89,
      commercialScore: 68,
      medianPrice: '$850,000',
      crimeRate: 'Low (2.7/10)',
      affordabilityIndex: '5.8',
      livabilityScore: 91,
    },
  ];
  
  const metrics = [
    { key: 'investmentScore', label: 'Investment Score' },
    { key: 'commercialScore', label: 'Commercial Score' },
    { key: 'medianPrice', label: 'Suburb Median Prices' },
    { key: 'crimeRate', label: 'Weighted Crime Rate' },
    { key: 'affordabilityIndex', label: 'Property Affordability Index' },
    { key: 'livabilityScore', label: 'Suburb Livability Score' },
  ];

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import RunButton from "./Buttons"
import { motion } from "framer-motion";

export default function SuburbPanel({ title, description, subDescriptionLabel, subDescriptionItems = [], children, runbutton, loading}) {
  const [isOpen, setIsOpen] = useState(false);

  const myAnimation = {
    initial: { opacity: 0, x: -50 },
    inView: { opacity: 1, x: 0 },
    hover: { borderColor: "rgba(255,255,255,1)", scale: 1.02 , y: -6}
   };
  return (
    <motion.div 
      whileInView='inView'
      whileHover='hover'
      viewport={{ once: true }}
      variants={myAnimation}
      className={`flex w-[90vw] pt-8 mx-auto flex-col rounded-xl border border-white/30 bg-[linear-gradient(to_top_right,rgba(24,44,88,0.4)_13.2%,rgba(227,228,252,0.02)_100%)] px-7 text-white backdrop-blur-20 ${loading && "animate-bg"}`}>

    <div className="flex flex-col items-center text-center px-6">
        <h2 className="text-[32px] text-white font-bold text-center">{title}</h2>
    </div>

    <div
        style={{
          maxHeight: "10000px",
          opacity: "1",
          transition: "max-height 400ms ease-in-out, opacity 400ms ease-in-out",
        }}
        className="flex flex-col gap-4 items-center py-5"
    >
        <div className="w-full flex flex-col gap-6 items-center px-15 pt-8">
          {children}
        </div>
        <div>{runbutton}</div>
      </div>
    </motion.div>
  );
}