import { useNavigate } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="nav-bar">
            <button className="nav-btn" onClick={() => navigate('/uploadjson')}>Upload JSON</button>
            <button className="nav-btn" onClick={() => navigate('/commercialrecs')}>Commercial recs</button>
            {/* <button className="nav-btn" onClick={() => navigate('/influencefactor')}>Influence factor</button> */}
            <button className="nav-btn" onClick={() => navigate('/investmentpotential')}>Investment potential</button>
            <button className="nav-btn" onClick={() => navigate('/propertyprices')}>Property prices</button>
            <button className="nav-btn" onClick={() => navigate('/propertyaffordabilityindex')}>Property affordability index</button>
            <button className="nav-btn" onClick={() => navigate('/suburbpricemap')}>Suburb price map</button>
            <button className="nav-btn" onClick={() => navigate('/suburblivability')}>Suburb livability</button>
            <button className="nav-btn" onClick={() => navigate('/topschoolarea')}>Top school area</button>
        </div>
    )
}

export default Navbar