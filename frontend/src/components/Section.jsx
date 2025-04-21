const Section = ({ className, id, customPaddings, children }) => {
  return (
    <div
      id={id}
      className={`
      relative ${customPaddings || `pt-16 pb-16`} ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Section;
