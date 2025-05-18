import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import CommercialRecs from "./pages/CommercialRecs";
import InfluenceFactor from "./pages/InfluenceFactor";
import InvestmentPotential from "./pages/InvestmentPotential";
import PropertyPrices from "./pages/PropertyPrices";
import PropertyAffordabilityIndex from "./pages/PropertyAffordabilityIndex";
import SuburbPriceMap from "./pages/SuburbPriceMap";
import TopSchoolArea from "./pages/TopSchoolArea";
import UploadJson from "./pages/UploadJson";
import SuburbLivability from "./pages/SuburbLivability";
import ForBusinesses from "./pages/ForBusinesses";
import ForIndividuals from "./pages/ForIndividuals";
import CompareSuburbs from "./pages/CompareSuburbs";
import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const knownPaths = ["/uploadjson", "/businesses", "/individuals", "/compare"];

  const hideNavBarPaths = ["/"];

  const showNavbar =
    knownPaths.includes(location.pathname) &&
    !hideNavBarPaths.includes(location.pathname);

  return (
    <div className=" bg-[url(/blurry-gradient-haikei.svg)] z-0 bg-cover bg-no-repeat bg-center">
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/uploadjson" element={<UploadJson />} />
        <Route path="/businesses" element={<ForBusinesses />} />
        <Route path="/individuals" element={<ForIndividuals />} />
        <Route path="/compare" element={<CompareSuburbs />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
