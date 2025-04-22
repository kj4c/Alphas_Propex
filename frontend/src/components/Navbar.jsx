import { useNavigate, useLocation } from 'react-router-dom';

import './Navbar.css'
import { GiFamilyHouse } from 'react-icons/gi';
const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="nav-bar flex w-full items-center text-white justify-between p-4 px-6">
              <div className="flex items-center gap-1">
                <GiFamilyHouse className="text-5xl text-[#8a2bdf]" />
                <button
                className={`text-xl font-semibold ${isActive('#hero') ? 'active' : ''}`}
                onClick={() => navigate('/')}
                >
                Propex
                </button>
            </div>
            <div className="flex gap-10 mx-auto pr-15">
                <button className={`nav-btn ${isActive('/uploadjson') ? 'active' : ''}`} onClick={() => navigate('/uploadjson')}>Upload JSON</button>
                <button className={`nav-btn ${isActive('/businesses') ? 'active' : ''}`} onClick={() => navigate('/businesses')}>For Businesses</button>
                <button className={`nav-btn ${isActive('/individuals') ? 'active' : ''}`} onClick={() => navigate('/individuals')}>For Individuals</button>
            </div>
        </div>
    )
}

export default Navbar