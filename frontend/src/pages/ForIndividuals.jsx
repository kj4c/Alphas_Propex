import PropertyAffordabilityIndex from "./PropertyAffordabilityIndex";
import PropertyPrices from "./PropertyPrices";
import SuburbLivability from "./SuburbLivability";
import SuburbPriceMap from "./SuburbPriceMap";
import TopSchoolArea from "./TopSchoolArea";

const ForIndividuals = () => {
  return (
    <div className="page mx-auto w-full px-6 py-5 flex flex-col gap-10">
      <h1 className="text-3xl font-bold mb-6">For Individuals</h1>
      <PropertyPrices />
      <PropertyAffordabilityIndex/>
      <SuburbLivability />
      <SuburbPriceMap />
      <TopSchoolArea />
    </div>
  );
};

export default ForIndividuals;
