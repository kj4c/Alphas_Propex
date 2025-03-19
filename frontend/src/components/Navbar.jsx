import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="nav-bar">
            <button className="nav-btn" onClick={() => navigate('/commercialrecs')}>Commercial recs</button>
            <button className="nav-btn" onClick={() => navigate('/incomeanalysis')}>Income analysis</button>
            <button className="nav-btn" onClick={() => navigate('/investmentpotential')}>Investment potential</button>
            <button className="nav-btn" onClick={() => navigate('/propertyprices')}>Property prices</button>
            <button className="nav-btn" onClick={() => navigate('/studenthousing')}>Student housing</button>
            <button className="nav-btn" onClick={() => navigate('/suburbpricemap')}>Suburb price map</button>
            <button className="nav-btn" onClick={() => navigate('/topschoolarea')}>Top school area</button>
            <button className="nav-btn" onClick={() => navigate('/uploadjson')}>Upload JSON</button>
        </div>
    )
}

export default Navbar