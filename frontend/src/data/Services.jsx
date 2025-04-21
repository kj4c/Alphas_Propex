import csv from "../assets/services/file-csv-color-red-icon.png";
import json from "../assets/services/file-json-color-red-icon.png";
import xml from "../assets/services/file-xml-color-green-icon.png";
import search from "../assets/services/search.png";
import attachment from "../assets/services/attachment.png";
import date from "../assets/services/date.png";
import mail from "../assets/services/mail.png";
import cyber from "../assets/services/cyber-security.png";
import imaging from "../assets/services/imaging.png";
import approval from "../assets/services/approval.png";

import { TbTextScan2 } from "react-icons/tb";
import { BsSoundwave } from "react-icons/bs";
import { BsDiscFill } from "react-icons/bs";
import { MdDisplaySettings } from "react-icons/md";
import { PiSlidersHorizontal } from "react-icons/pi";

export const servicesData = [
  "Analyzes property prices, income, and size",
  "Scores suburbs as overpriced, fairly priced, or undervalued",
  "Identifies suburbs within financial reach",
  "Helps compare affordability across areas",
];

export const servicesData2 = [
  "Rates suburbs based on proximity to the CBD",
  "Considers property size and population density",
  "Assesses crime and extreme weather risks",
  "Guides families in choosing the best suburbs for long-term living",
];

export const servicesData3 = [
  {
    id: "0",
    title: "Filtered Properties Averages",
    text: "Provides a suite of filters to pinpoint ideal estates and properties, averaging the target variable specified (e.g. price of households in specific suburbs, number of bathrooms/bedrooms in specific household types, etc).",
  },
  {
    id: "1",
    title: "Ranked Influence Factors",
    text: "Provides a ranked list of real estate features effecting the target variable (from most impactful to least impactful)",
  },
  {
    id: "2",
    title: "Suburb Median Price Heatmap",
    text: "An interactive heatmap displaying median property prices across Sydney suburbs, offering a clear visual guide to market trends and pricing insights.",
  },
  {
    id: "3",
    title: "Suburb Safety Score",
    text: "UGenerates a safety score for each suburb by analyzing crime rates per 100,000 people—where lower crime leads to a higher, more reassuring score for residents and investors.",
  },
];

export const servicesIcon = [
  {
    id: "0",
    title: "CSV",
    icon: csv,
    width: 40,
    height: 34,
  },
  {
    id: "1",
    title: "XML",
    icon: xml,
    width: 40,
    height: 34,
  },
  {
    id: "2",
    title: "JSON",
    icon: json,
    width: 40,
    height: 34,
  },
  {
    id: "3",
    title: "Search",
    icon: search,
    width: 36,
    height: 36,
  },
  {
    id: "4",
    title: "Cyber",
    icon: cyber,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Attachment",
    icon: attachment,
    width: 38,
    height: 32,
  },
  {
    id: "6",
    title: "Date",
    icon: date,
    width: 36,
    height: 36,
  },
  {
    id: "7",
    title: "Imaging",
    icon: imaging,
    width: 40,
    height: 40,
  },
  {
    id: "8",
    title: "Mail",
    icon: mail,
    width: 36,
    height: 36,
  },
  {
    id: "9",
    title: "Approval",
    icon: approval,
    width: 36,
    height: 36,
  },
];

export const RenderingIcons = [
  {
    id: 0,
    icon: <TbTextScan2 />,
  },
  {
    id: 1,
    icon: <BsSoundwave />,
  },
  {
    id: 2,
    icon: <BsDiscFill />,
  },
  {
    id: 3,
    icon: <MdDisplaySettings />,
  },
  {
    id: 4,
    icon: <PiSlidersHorizontal />,
  },
];

import { BsUpcScan } from "react-icons/bs";
import { GrValidate } from "react-icons/gr";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineReport } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";

export const ValidateIcons = [
  {
    id: 0,
    icon: <BsUpcScan />,
  },
  {
    id: 1,
    icon: <GrValidate />,
  },
  {
    id: 2,
    icon: <FaListCheck />,
  },
  {
    id: 3,
    icon: <MdOutlineReport />,
  },
  {
    id: 4,
    icon: <RxCrossCircled />,
  },
];
