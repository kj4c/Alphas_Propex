import InvestmentPotential from "./InvestmentPotential";
import CommercialRecommendations from "./CommercialRecs";
// Add more if needed

const ForBusinesses = () => {
  return (
    <>
      <div className="relative w-full h-[60vh] bg-cover bg-[url(src/assets/darkbuildings.jpg)] bg-center backdrop-blur-sm bg-white/10">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center">
        <h1 className="text-white text-[80px] font-bold">For Businesses</h1>
      </div>
      <div className="absolute bottom-0 w-full h-3 bg-gradient-to-t from-[#010314]/90 to-transparent backdrop-blur-md"></div>
    </div>
      <div className="page mx-auto w-full px-6 py-5 flex flex-col gap-10">
          <InvestmentPotential />
          <CommercialRecommendations />

        {/* Add other components similarly */}
      </div>
    </>
  );
};

export default ForBusinesses;
