import "../stylesheets/SendReceive.css";
import Section from "./Section.jsx";
import { servicesData3 } from "../data/Services.jsx";
import { FaCircleCheck } from "react-icons/fa6";
import { GiCosmicEgg } from "react-icons/gi";
import { servicesIcon } from "../data/Services.jsx";
import curve1 from "../assets/services/curve-1.svg";
import curve2 from "../assets/services/curve-2.svg";

const SendReceive = () => {
  return (
    <Section id="sendreceive">
      <div className="SendReceive">
        <div className="SendReceiveContainer">
          <h2>Effortless Invoice Management </h2>

          {/* Dynamically render bullet points*/}
          <ul className="SendReceiveListContainer">
            {servicesData3.map((item) => (
              <li className="SendReceiveListBox" key={item.id}>
                <div className="SendReceiveListItems">
                  <div className="checkIcon">
                    <FaCircleCheck />
                  </div>

                  <h6>{item.title}</h6>
                </div>
                {item.text && <p>{item.text}</p>}
              </li>
            ))}
          </ul>
        </div>

        {/* Rendering Circle Graphics */}
        <div className="CircleGraphicTitleContainer">
          <p>
            With a multitude of features, it&apos;s the ultimate solution for
            teams looking to work smarter and faster.
          </p>

          <div className="OuterCircle">
            <div className="InnerCircle">
              <div className="LogoBorder">
                <div className="CircleGraphicLogo">
                  <GiCosmicEgg />
                </div>
              </div>
            </div>

            {/* Rendering logos on circle graphic */}
            <ul className="iconList">
              {servicesIcon.map((icon) => (
                <li key={icon.id}>
                  <div>
                    <img
                      className="m-auto"
                      width={icon.width}
                      height={icon.height}
                      alt={icon.title}
                      src={icon.icon}
                    />
                  </div>
                </li>
              ))}
            </ul>

            {/* Rendering Left Curve */}
            <div className="LeftCurve">
              <img src={curve1} width={522} height={182} alt="Curve 1" />
            </div>

            {/* Rendering Right Curve */}
            <div className="RightCurve">
              <img src={curve2} width={162} height={76} alt="Curve 2" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SendReceive;
