import React from "react";

const RunButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative group bg-gradient-to-b from-[#150f2f] to-[#442b72] 
      text-[#ecdcff] font-medium py-4 px-15 rounded-lg border-[0.2px] mt-5
      border-white hover:bg-purple-800 transition cursor-pointer text-2xl"
    >
      {text}
      <div className="absolute inset-0 bg-white opacity-0 rounded-lg group-hover:opacity-20 transition duration-300 pointer-events-none"></div>
    </button>
  );
};

export default RunButton;
