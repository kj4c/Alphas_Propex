import {motion} from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
import Loading from "@/components/Loading";
import SimplePanel from "@/components/Panel3";
import SuburbPanel from "@/components/Panel3";
import Compare from "./Compare"

// Compare Suburbs Page

const CompareSuburbs = () => {
  const maskVariants = {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    show: {
        clipPath: "inset(0 0 0% 0)",
        transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        },
    },
  };
    return (
    <>
      <motion.div         
        variants={maskVariants}
        initial="hidden"
        animate="show"
        className="animate-fade-blur-in relative w-full h-[60vh] bg-cover bg-[url(/darkbuildings.jpg)] bg-center backdrop-blur-sm bg-white/10">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center">
          <h1 className="animate-fade-move-blur-in text-white text-[80px] font-bold">Compare Suburbs</h1>
        </div>
        <div className="absolute bottom-0 w-full h-3 bg-gradient-to-t from-[#010314]/90 to-transparent backdrop-blur-md"></div>
      </motion.div>
      <div className="page w-full px-10 py-10 flex justify-center">
        <Compare />
      </div>
    </>
  )
}

export default CompareSuburbs;