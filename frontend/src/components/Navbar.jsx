import { useNavigate, useLocation } from 'react-router-dom';

import './Navbar.css'
const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="nav-bar">
            <button className={`nav-btn ${isActive('/uploadjson') ? 'active' : ''}`} onClick={() => navigate('/uploadjson')}>Upload JSON</button>
            <button className={`nav-btn ${isActive('/businesses') ? 'active' : ''}`} onClick={() => navigate('/businesses')}>For Businesses</button>
            <button className={`nav-btn ${isActive('/individuals') ? 'active' : ''}`} onClick={() => navigate('/individuals')}>Individuals</button>
        </div>
    )
}

export default Navbar