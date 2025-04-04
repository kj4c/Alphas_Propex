import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import CommercialRecs from './pages/CommercialRecs';
import InfluenceFactor from './pages/InfluenceFactor';
import InvestmentPotential from './pages/InvestmentPotential';
import PropertyPrices from './pages/PropertyPrices';
import PropertyAffordabilityIndex from './pages/PropertyAffordabilityIndex';
import SuburbPriceMap from './pages/SuburbPriceMap';
import TopSchoolArea from './pages/TopSchoolArea';
import UploadJson from './pages/UploadJson';
import SuburbLivability from './pages/SuburbLivability';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/commercialrecs" element={<CommercialRecs />} />
        <Route path="/influencefactor" element={<InfluenceFactor />} />
        <Route path="/investmentpotential" element={<InvestmentPotential />} />
        <Route path="/propertyprices" element={<PropertyPrices />} />
        <Route path="/propertyaffordabilityindex" element={<PropertyAffordabilityIndex />} />
        <Route path="/suburbpricemap" element={<SuburbPriceMap />} />
        <Route path="/topschoolarea" element={<TopSchoolArea />} />
        <Route path="/uploadjson" element={<UploadJson />} />
        <Route path="/suburblivability" element={<SuburbLivability />} />

      </Routes>
    </BrowserRouter>
  )

}

export default App;
