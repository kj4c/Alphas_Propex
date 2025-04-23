import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
                <motion.button
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`text-xl font-semibold ${isActive('#hero') ? 'active' : ''} cursor-pointer`}
                onClick={() => navigate('/')}
                >
                Propex
                </motion.button>
            </div>
            <div className="flex gap-10 mx-auto pr-15">
                <motion.button
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`nav-btn ${isActive('/uploadjson') ? 'active' : ''}`}
                    onClick={() => navigate('/uploadjson')} 
                >
                    Upload Dataset  
                </motion.button>
                <motion.button
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`nav-btn ${isActive('/businesses') ? 'active' : ''}`}
                    onClick={() => navigate('/businesses')}
                >
                    For Businesses
                </motion.button>
                <motion.button
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`nav-btn ${isActive('/individuals') ? 'active' : ''}`}
                    onClick={() => navigate('/individuals')}
                >
                    For Individuals
                </motion.button>

            </div>
        </div>
    )
}

export default Navbar