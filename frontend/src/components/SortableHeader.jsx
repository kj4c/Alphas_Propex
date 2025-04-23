const SortableHeader = ({ label, field, sortConfig, onClick }) => {
    const isSorted = sortConfig.key === field;
    const direction = isSorted ? (sortConfig.direction === "asc" ? "▲" : "▼") : "";
  
    return (
      <th
        className="px-6 py-3 cursor-pointer select-none"
        onClick={() => onClick(field)}
      >
        {label} {direction}
      </th>
    );
};

export default SortableHeader;
  