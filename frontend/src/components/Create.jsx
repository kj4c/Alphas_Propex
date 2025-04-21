import Section from "./Section.jsx";
import DemoPropertyAfford from "../pages/demoPropertyAfford.jsx";
import DemoSuburbLivability from "../pages/demoSuburbLivability.jsx";
import { servicesData, servicesData2 } from "../data/Services.jsx";
import Heading from "./Heading.jsx";
import { FaCircleCheck } from "react-icons/fa6";
import "../stylesheets/Create.css";

const Create = () => {
  return (
    <Section id="create">
      <div className="CreateContainer">
        <Heading
          title="Simplify Property Affordability and Suburb Livability Analysis"
          subTitle="Save time and make informed decisions with easy-to-use tools for assessing affordability and livability."
        />

        <div style={{ position: "relative" }}>
          {/* GUI Demo */}
          <div className="CreateBentoContainer">
            <div className="CreateBentoBox">
              <div className="CreateImage">
                <DemoPropertyAfford />
              </div>
            </div>

            <div className="CreateBentoListContainer">
              <h4>Tailored Affordability Score Generation</h4>
              <p>
                Empowering Homebuyers and Investors with Data-Driven
                Affordability Insights
              </p>
              <ul>
                {servicesData.map((item, index) => (
                  <li key={index} className="CreateBentoListItems">
                    <div className="checkIcon">
                      <FaCircleCheck />
                    </div>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Invoice Upload Demo */}
          <div className="CreateBentoContainer">
            <div className="CreateBentoBox">
              <div className="CreateImage">
                <DemoSuburbLivability />
              </div>
            </div>

            <div className="CreateBentoListContainer">
              <h4>Comprehensive Suburb Livability Score</h4>
              <p>
                Save more time and effort by simply importing JSON or CSV files
                for seamless invoice creation.
              </p>
              <ul>
                {servicesData2.map((item, index) => (
                  <li key={index} className="CreateBentoListItems">
                    <div className="checkIcon">
                      <FaCircleCheck />
                    </div>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Create;
