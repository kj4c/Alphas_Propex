import React from 'react';

const BasicInput = ({ name, placeholder, onChange, type = "text" }) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-[#1e1a36] text-white text-xl m-1
                   placeholder:text-gray-400 border border-[#2a263d] 
                   rounded-xl px-5 py-3 focus:outline-none
                   focus:border-[#ffffffe0] focus:border-1 focus:bg-none focus:bg-[#0b0a27] shadow-inner"
      />
    );
  }
  
  export default BasicInput;
