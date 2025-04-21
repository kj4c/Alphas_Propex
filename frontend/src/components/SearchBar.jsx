import loadingIcon from "../assets/hero/loading.png";

const SearchBar = ({ className }) => {
  return (
    <div
      className={`flex items-center h-[3.5rem] pl-[1.5rem] pr-[1.5rem] rounded-[1.7rem] bg-[#0e0c15] bg-opacity-80 text-[1rem] leading-[1.5rem] ${
        className || ""
      }`}
    >
      <img
        className="w-[1.25rem] h-[1.25rem] mr-[1rem]"
        src={loadingIcon}
        alt="loading"
      />
      Create, Validate, Render, Compose, Send and Receive Invoices ...
    </div>
  );
};

export default SearchBar;
