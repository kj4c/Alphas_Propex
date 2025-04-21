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
  "Comprehensive GUI Form",
  "Save Time",
  "Boost Productivity",
  "Reducing Manual Data Entry",
];

export const servicesData2 = [
  "Conveniently upload files",
  "Supports file upload in JSON or CSV formats",
  "Flexibility in data submission methods",
];

export const servicesData3 = [
  {
    id: "0",
    title: "Diverse Invoice Sending Options",
    text: "Email XML and JSON invoices effortlessly, send batch emails with multiple XML/JSON files, schedule emails for later, and send multiple emails with invoices—all with ease and efficiency.",
  },
  {
    id: "1",
    title: "Centralised Invoice Management",
    text: "Easily manage invoices by navigating to the receiving section, where all received invoices are centralized for convenient access and organization.",
  },
  {
    id: "2",
    title: "Invoice Viewing and Downloading",
    text: "Ensure no invoices go missing as each one is easily viewable and downloadable with a single click, streamlining the invoice management process.",
  },
  {
    id: "3",
    title: "Advance Filter and Search Capabilities",
    text: "Utilize the fetching feature to search for specific invoices by their ID, date, or date range, narrowing down the search space and enhancing organization.",
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
