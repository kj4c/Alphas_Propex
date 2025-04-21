import './index.css';
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
import ForBusinesses from './pages/ForBusinesses';
import ForIndividuals from './pages/ForIndividuals';

function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-cover bg-no-repeat text-white bg-[linear-gradient(to_top,_#05030c_0%,_#01030c_50%,_#12182f_100%)]">
    <Navbar/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/uploadjson" element={<UploadJson />} />
          <Route path="/businesses" element={<ForBusinesses />} />
          <Route path="/individuals" element={<ForIndividuals/>} />
        </Routes>
      </div>  
    </BrowserRouter>
  )

}

export default App;
