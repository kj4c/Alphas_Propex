import { useLocation } from "react-router-dom";
import { GiFamilyHouse } from "react-icons/gi";
import "../stylesheets/header.css";

import { navItems } from "../data/navbarData";

export const Header = () => {
  const url = useLocation();

  return (
    <div className="HeaderPos">
      <div className="HeaderContainer">
        {/* Logo */}
        <a className="LogoContainer" href="#hero">
          <div className="Logo">
            <GiFamilyHouse />
          </div>
          Propex
        </a>

        {/* Dyanmically rendering each item in nav bar */}
        <nav className="navContainer">
          <div className="navContent">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className={`navItem ${
                  item.url === url.hash ? `activeItem` : `unActiveItem`
                }`}
              >
                {item.title}
              </a>
            ))}
          </div>
        </nav>

        {/* SignUp and Login button in Navbar */}
        <div className="buttonsContainer">
          <a href="/uploadjson" className="loginButton">
            GET STARTED
          </a>
        </div>
      </div>
    </div>
  );
};
