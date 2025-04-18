import InvestmentPotential from "./InvestmentPotential";
import CommercialRecommendations from "./CommercialRecs";
// Add more if needed

const ForBusinesses = () => {
  return (
    <div className="page mx-auto w-full px-6 py-5 flex flex-col gap-10">
      <h1 className="text-3xl font-bold mb-6">For Businesses</h1>
        <InvestmentPotential />
        <CommercialRecommendations />

      {/* Add other components similarly */}
    </div>
  );
};

export default ForBusinesses;
