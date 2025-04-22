import "../stylesheets/Heading.css";

const Heading = ({ className, title, subTitle }) => {
  return (
    <div className={`${className} HeadingContainer animate-fade-blur-in`}>
      {title && <h2 className="heading2">{title}</h2>}
      {subTitle && <p className="subTitle">{subTitle}</p>}
    </div>
  );
};

export default Heading;
