import Section from "./Section";
import Heading from "./Heading";
import "../stylesheets/Features.css";
import { features } from "../data/Features";
import { MdKeyboardArrowRight } from "react-icons/md";

export const Features = () => {
  return (
    <Section id="features">
      <div className="FeaturesContainer">
        {/* Re-usable Heading component */}
        <Heading
          className="FeaturesContainerHeading"
          title="Effortlessly Manage Your Invoices with Eggs-Invoicing"
        />

        <div className="CardContainer">
          {/* Rendering individual Cards */}
          {features.map((item) => (
            <div
              className="CardBox"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="Card">
                <h5>{item.title}</h5>
                <p>{item.text}</p>
                <div className="CardMoreContainer">
                  {/* dynamically rendering each card and it's properties */}
                  <div
                    className="CardIcon"
                    style={{ backgroundColor: item.colour }}
                  >
                    {item.icon}
                  </div>
                  <a href={item.url}>Explore more</a>
                  <div className="Arrow">
                    <MdKeyboardArrowRight />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Features;
