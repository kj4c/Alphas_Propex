import "../stylesheets/RenderValidate.css";
import Section from "./Section.jsx";
import { RenderingIcons, ValidateIcons } from "../data/Services.jsx";
import render3 from "../assets/services/Render3.png";
import validate1 from "../assets/services/Validate1.png";
import DemoSuburbPriceMap from "../pages/demoSuburbPriceMap";

const RenderValidate = () => {
  return (
    <Section id="rendervalidate">
      <div className="RenderValidate">
        <div className="RenderValidateContainer">
          {/* Left Grid */}
          <div className="LeftGrid">
            {/* LeftImage */}
            <div className="LeftGridImageContainer">
              {/* <img src={validate1} alt="validate1" /> */}
              <DemoSuburbPriceMap />
            </div>

            {/* Invoice Rendering Icons */}
            <ul
              style={{ marginRight: "2rem", marginBottom: "-1.5rem" }}
              className="RenderingIconsContainer"
            >
              {ValidateIcons.map((item, index) => (
                <li
                  key={item.id}
                  className={`RenderingIcons ${
                    index === 2 ? "GradientBorder" : "NormalBorder"
                  }`}
                >
                  <div className={`${index === 2 ? "GradientImage" : ""}`}>
                    {item.icon}
                  </div>
                </li>
              ))}
            </ul>

            <div className="LeftGridContent">
              <h4>Invoice Validation</h4>
              <p>
                Manual validation of invoices is time-consuming, costly, and
                error-prone, with a 3-4% average error rate. Eggs Invoicing
                automates validation, ensuring compliance, saving time, cutting
                costs, and mitigating risks.
              </p>
            </div>
          </div>

          {/* Right Grid */}
          <div className="RightGrid">
            <div className="RightGridContent">
              <h4>Invoice Rendering</h4>
              <p>
                Our platform offers powerful rendering capabilities that enable
                users to effortlessly generate well-formatted invoices from XML
                files. Say goodbye to manual formatting and hello to
                professional-looking invoices with just a few clicks. Save time
                and ensure accuracy with our advance rendering feature.
              </p>

              {/* Invoice Rendering Icons */}
              <ul className="RenderingIconsContainer">
                {RenderingIcons.map((item, index) => (
                  <li
                    key={item.id}
                    className={`RenderingIcons ${
                      index === 2 ? "GradientBorder" : "NormalBorder"
                    }`}
                  >
                    <div className={`${index === 2 ? "GradientImage" : ""}`}>
                      {item.icon}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="RightGridImageContainer">
              <img src={render3} width={520} height={400} alt="Scary robot" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default RenderValidate;
