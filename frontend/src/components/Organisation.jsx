import org1 from "../assets/hero/organisation/org1.png";
import { orgImages } from "../data/OrganisationData.jsx";

const Organisation = ({ className, title }) => {
  return (
    <div
      className={`${
        className || ""
      } flex items-center gap-[0.75rem] rounded-[1rem] p-[0.7rem] pr-[1.5rem] border border-solid border-[#ffffff1a] bg-[#474060] bg-opacity-40 backdrop-blur-[8px]`}
    >
      <img
        src={org1}
        width={62}
        height={62}
        style={{ borderRadius: "0.75rem" }}
        alt="Org1"
      />

      <div className="flex-grow flex-shrink flex-basis-[0%]">
        <h6 className="font-semibold text-[1rem] leading-[1.5rem] mb-[0.25rem]">
          {title}
        </h6>

        <div className="flex items-center justify-between">
          <ul className="flex -m-[2.5rem]">
            {orgImages.map((item, index) => (
              <li
                className="flex w-[1.5rem] overflow-hidden rounded-full border-2 border-[#2e2a41]"
                key={index}
              >
                <img
                  src={item}
                  style={{ width: "100%" }}
                  width={10}
                  height={20}
                  alt={item}
                />
              </li>
            ))}
          </ul>
          <div className="font-light text-[15px] text-gray-500">1m ago</div>
        </div>
      </div>
    </div>
  );
};

export default Organisation;
