import { FaFileInvoice } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
import { ImFilePicture } from "react-icons/im";
import { SlPaperPlane } from "react-icons/sl";
import { HiOutlineFolderOpen } from "react-icons/hi2";
import { MdOutlineSecurity } from "react-icons/md";

export const features = [
  {
    id: "0",
    title: "Property Affordability Index",
    text: "A baseline tool that evaluates the feasibility of investing in a location based on buyer income, empowering homebuyers and businesses with data-driven insights.",
    backgroundUrl: "./src/assets/features/card-1.svg",
    icon: <FaFileInvoice />,
    url: "#create",
    colour: "#5ee1ea",
  },
  {
    id: "1",
    title: "Investment Potential Analysis",
    text: "A data-driven feature that assesses suburb growth potential through factors like inflation, rental yield, and demand—helping investors spot opportunities early and invest with confidence. ",
    backgroundUrl: "./src/assets/features/card-2.svg",
    icon: <GrValidate />,
    light: true,
    url: "#rendervalidate",
    colour: "#FFC876",
  },
  {
    id: "2",
    title: "Schools Proximity Insight",
    text: "A family-focused feature that highlights properties near schools, helping buyers make strategic, long-term decisions that prioritize education, convenience, and community.",
    backgroundUrl: "./src/assets/features/card-3.svg",
    icon: <ImFilePicture />,
    url: "#rendervalidate",
    colour: "#AC6AFF",
  },
  {
    id: "3",
    title: "Suburb Livability Score",
    text: "Calculates a livability score using factors like distance to the CBD, property size, population density, crime, and extreme weather—guiding families to ideal suburbs for long-term living.",
    backgroundUrl: "./src/assets/features/card-4.svg",
    icon: <SlPaperPlane />,
    light: true,
    url: "#create",
    colour: "#7ADB78",
  },
  {
    id: "4",
    title: "Commercial Recommendations",
    text: `Provides a ranked list of recommended suburbs for commercial properties based on suburb population density and average income. Also gives specific targeted recommendations based on the demographic of the suburb.`,
    backgroundUrl: "./src/assets/features/card-5.svg",
    icon: <HiOutlineFolderOpen />,
    url: "#sendreceive",
    colour: "#FF776F",
  },
  {
    id: "5",
    title: `Filtered Properties Averages`,
    text: "Provides a suite of filters to pinpoint ideal estates and properties, averaging the target variable specified (e.g. price of households in specific suburbs, number of bathrooms/bedrooms in specific household types, etc). ",
    backgroundUrl: "./src/assets/features/card-6.svg",
    icon: <MdOutlineSecurity />,
    url: "#sendreceive",
    colour: "#ea5ed0",
  },
];
