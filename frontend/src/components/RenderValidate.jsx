import "../stylesheets/RenderValidate.css";
import Section from "./Section.jsx";
import { RenderingIcons, ValidateIcons } from "../data/Services.jsx";
import DemoSuburbPriceMap from "../pages/demoSuburbPriceMap";
import DemoTopSchoolArea from "@/pages/DemoTopSchoolArea";

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
              <h4>Interactive Suburb Price Map</h4>
              <p>
                A dynamic map that visualizes median property prices across
                suburbs using color-coded markers, categorizing pricing trends
                with quantiles to help users easily compare and identify areas
                with higher or lower property values.
              </p>
            </div>
          </div>

          {/* Right Grid */}
          <div className="RightGrid">
            <div className="RightGridContent">
              <h4>Top School Area Property Analysis</h4>
              <p>
                Identifying suburbs near top schools with the best property
                value and income ratios based on school type, district, and
                proximity. It provides a list of suburbs with top schools,
                offering valuable insights for investment or family relocation
                by comparing neighborhoods near preferred school types.
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
              {/* <img src={render3} width={520} height={400} alt="Scary robot" /> */}
              <DemoTopSchoolArea />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default RenderValidate;
