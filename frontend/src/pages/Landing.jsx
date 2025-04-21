import RunButton from "../components/Buttons";
import { Header } from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Services from "../components/Services";
// import Pricing from "../components/Pricing";
// import LandingpageTeam from "../components/LandingpageTeam";
import "../stylesheets/LandingPage.css";

const Landing = () => {
  return (
    <div className="landingPageTheme">
      <div className="headerContainer">
        <Header />
        <Hero />
        <Features />
        <Services />
        {/* <LandingpageTeam /> */}
        {/* <Pricing /> */}
      </div>
    </div>
  );
};

export default Landing;
