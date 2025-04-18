const Dropdown = ({ label, value, onChange, options }) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label className="text-sm text-gray-300">{label}</label>}
        <select
          value={value}
          onChange={onChange}
          className="pr-10 bg-[linear-gradient(to_top_right,rgba(24,44,88,0.4)_13.2%,rgba(227,228,252,0.02)_88.27%)] text-[#c8c8c8] border border-[#c8c8c8] rounded-md px-4 py-2 cursor-pointer transition duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#466fba]"
        >
          {options.map((opt, i) => (
            <option key={i} value={i} className="text-black">
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Dropdown;
  