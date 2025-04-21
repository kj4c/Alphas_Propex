import Section from "./Section";
import "../stylesheets/Hero.css";
import curve from "../assets/hero/curve.png";
import banner1 from "../assets/hero/banner1.jpg";
import { BackgroundCircles, Gradient } from "./design/Hero";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import icon1 from "../assets/hero/icon1.svg";
import icon2 from "../assets/hero/icon2.svg";
import icon3 from "../assets/hero/icon3.svg";
import icon4 from "../assets/hero/icon4.svg";
import SearchBar from "./SearchBar";
import Organisation from "./Organisation";

const Hero = () => {
  const parallaxRef = useRef(null);
  return (
    <Section className="HeroContainer" customPaddings id="hero">
      <div className="HeroBox" ref={parallaxRef}>
        <div className="HeroTitleContainer">
          {/* Hero Title */}
          <h1>
            Streamline Your Invoicing Process with{" "}
            {/* Separate inline block for 'Eggs-Invoicing' */}
            <span>
              Eggs-Invoicing
              <img src={curve} width={415} height={15} alt="curve" />
            </span>
          </h1>

          {/* Sub heading */}
          <p>
            A complete end-to-end e-invoicing solution that simplifies and
            automates the invoicing process. Say goodbye to manual operations
            and inefficiencies.
          </p>

          {/* Get Started Button */}
          <a href="/register"> Get Started </a>
        </div>

        {/* Hero Picture */}
        <div className="HeroImageContainer">
          <div className="HeroImageFrame">
            <div className="HeroImageBackground">
              {/* <div className='HeroImageTopPadding' /> */}
              <div className="HeroImageBorder">
                <img src={banner1} width={1024} height={490} alt="banner" />

                {/* Scroll parallax for Searchbar */}
                <ScrollParallax isAbsolutelyPositioned>
                  <SearchBar className="SearchBarPos" />
                </ScrollParallax>

                {/* Scroll parallax for HeroIcons  */}
                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="HeroIcons">
                    <li>
                      <img src={icon1} width={24} height={25} alt="i1" />
                    </li>
                    <li>
                      <img src={icon2} width={24} height={25} alt="i2" />
                    </li>
                    <li>
                      <img src={icon3} width={24} height={25} alt="i3" />
                    </li>
                    <li>
                      <img src={icon4} width={24} height={25} alt="i4" />
                    </li>
                  </ul>
                </ScrollParallax>

                {/* Scroll parallax for Organisation Members */}
                <ScrollParallax isAbsolutelyPositioned>
                  <Organisation
                    className="OrganisationPos"
                    title="Team Members"
                  />
                </ScrollParallax>
              </div>
            </div>
            <Gradient />
          </div>
          <BackgroundCircles />
        </div>
      </div>
    </Section>
  );
};

export default Hero;
