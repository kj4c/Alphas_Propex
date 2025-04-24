import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import RunButton from "./Buttons"
import { motion } from "framer-motion";

export default function Panel({ title, description, subDescriptionLabel, subDescriptionItems = [], children, runbutton, loading}) {
  const [isOpen, setIsOpen] = useState(false);

  const myAnimation = {
    initial: { opacity: 0, x: -50 },
    inView: { opacity: 1, x: 0 },
    hover: { borderColor: "rgba(255,255,255,1)", scale: 1.02 , y: -6}
   };
  return (
    <motion.div 
      initial='initial' 
      whileInView='inView'
      whileHover='hover'
      viewport={{ once: true }}
      variants={myAnimation}
      className={`flex w-[90vw] pt-8 mx-auto flex-col rounded-xl border border-white/30 bg-[linear-gradient(to_top_right,rgba(24,44,88,0.4)_13.2%,rgba(227,228,252,0.02)_100%)] px-7 text-white backdrop-blur-20 ${loading && "animate-bg"}`}>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col pl-6">
          <h2 className="text-[32px] text-white font-bold">{title}</h2>
          <p className="text-[20px] text-white/70 mt-3">{description}</p>  
          <p className="text-[23px] text-white/70 mt-6 text-bold font-bold">{subDescriptionLabel}</p>
          <ul className=" list-disc list-inside text-white/70 mt-3 flex flex-col gap-1">
            {subDescriptionItems.map((item, index) => (
              <li key={index} className="text-[20px]">{item}</li>
            ))}
          </ul>
        </div>
        <Button
          size="circle"
          className="bg-[#ffffff1a] p-8 mr-4 rounded-full hover:bg-[#ffffff33] transition justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown
            className={cn(
              "h-12 w-12 transform transition-transform duration-300 text-white",
              isOpen ? "rotate-0" : "rotate-90"
            )}
          />
          <span className="sr-only">Toggle</span>
        </Button>
      </div>

      <div
        style={{
          maxHeight: isOpen ? "10000px" : "0",
          opacity: isOpen ? "1" : "0",
          overflow: "hidden",
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
