import { useNavigate, useLocation } from 'react-router-dom';

import './Navbar.css'
const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="nav-bar">
            <button className={`nav-btn ${isActive('/uploadjson') ? 'active' : ''}`} onClick={() => navigate('/uploadjson')}>Upload JSON</button>
            <button className={`nav-btn ${isActive('/commercialrecs') ? 'active' : ''}`} onClick={() => navigate('/commercialrecs')}>Commercial Recommendations</button>
            {/* <button className={`nav-btn ${isActive('/influencefactor') ? 'active' : ''}`} onClick={() => navigate('/influencefactor')}>Influence factor</button> */}
            <button className={`nav-btn ${isActive('/investmentpotential') ? 'active' : ''}`} onClick={() => navigate('/investmentpotential')}>Investment Potential</button>
            <button className={`nav-btn ${isActive('/propertyprices') ? 'active' : ''}`} onClick={() => navigate('/propertyprices')}>Property Prices</button>
            <button className={`nav-btn ${isActive('/propertyaffordabilityindex') ? 'active' : ''}`} onClick={() => navigate('/propertyaffordabilityindex')}>Property Affordability Index</button>
            <button className={`nav-btn ${isActive('/suburbpricemap') ? 'active' : ''}`} onClick={() => navigate('/suburbpricemap')}>Suburb Price Map</button>
            <button className={`nav-btn ${isActive('/suburblivability') ? 'active' : ''}`} onClick={() => navigate('/suburblivability')}>Suburb Livability</button>
            <button className={`nav-btn ${isActive('/topschoolarea') ? 'active' : ''}`} onClick={() => navigate('/topschoolarea')}>Top School Area</button>
        </div>
    )
}

export default Navbar