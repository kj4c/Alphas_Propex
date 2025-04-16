import React from 'react';

const BasicInput = ({ name, placeholder, onChange, type = "text" }) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-gradient-to-b from-[#0e0b1e] to-[#0b0a1c] text-white 
                   placeholder:text-gray-400 border border-[#2a263d] 
                   rounded-xl px-4 py-3 focus:outline-none focus:ring-2 
                   focus:ring-[#5f4bb6] shadow-inner"
      />
    );
  };
  
  export default BasicInput;
