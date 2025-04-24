import InvestmentPotential from "./InvestmentPotential";
import CommercialRecommendations from "./CommercialRecs";
import {motion} from "framer-motion";

const ForBusinesses = () => {
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
          <h1 className="animate-fade-move-blur-in text-white text-[80px] font-bold">For Businesses</h1>
        </div>
        <div className="absolute bottom-0 w-full h-3 bg-gradient-to-t from-[#010314]/90 to-transparent backdrop-blur-md"></div>
      </motion.div>
      <div className="page mx-auto w-full px-6 py-10 flex flex-col gap-10 pb-40">
          <InvestmentPotential />
          <CommercialRecommendations />

        {/* Add other components similarly */}
      </div>
    </>
  );
};

export default ForBusinesses;
