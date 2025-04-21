import PropertyAffordabilityIndex from "./PropertyAffordabilityIndex";
import PropertyPrices from "./PropertyPrices";
import SuburbLivability from "./SuburbLivability";
import SuburbPriceMap from "./SuburbPriceMap";
import TopSchoolArea from "./TopSchoolArea";
import TestPropertyAfford from "./testPropertyAfford";

const ForIndividuals = () => {
  return (
    <>
      <h1 className="font-inter animate-fade-blur-in text-3xl">
  Test animation + font
</h1>
      <div className="relative w-full h-[60vh] bg-cover bg-[url(src/assets/darkhouse.jpg)] bg-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center">
        <h1 className="animate-fade-blur-in text-white font-inter text-[80px] font-bold">For Individuals</h1>
      </div>
        <div className="absolute bottom-0 w-full h-3 bg-gradient-to-t from-[#010314]/90 to-transparent backdrop-blur-md"></div>
      </div>
      <div className="page mx-auto w-full px-6 py-5 flex flex-col gap-10">
      <PropertyPrices />
      <PropertyAffordabilityIndex />
      <SuburbLivability />
      <SuburbPriceMap />
      <TopSchoolArea />
      </div>
    </>
  );
};

export default ForIndividuals;
