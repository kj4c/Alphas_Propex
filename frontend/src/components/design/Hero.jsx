import { MouseParallax } from "react-just-parallax";

export const Gradient = () => {
  return (
    <>
      <div className="relative ml-8 mr-8 h-6 rounded-bl-[1.25rem] rounded-br-[1.25rem] z-10 bg-[#1b1b2e]" />
      <div className="relative ml-[5rem] mr-[5rem] h-6 rounded-bl-[1.25rem] rounded-br-[1.25rem] bg-[rgba(27,27,46,0.7)] z-10" />
    </>
  );
};

const Rings = () => {
  return (
    <>
      <div className="absolute left-1/2 top-1/2 aspect-[1/1] border border-[rgba(202,198,221,0.1)] rounded-full transform -translate-x-1/2 -translate-y-1/2 w-[65.875rem]" />
      <div className="absolute left-1/2 top-1/2 aspect-[1/1] border border-[rgba(202,198,221,0.1)] rounded-full transform -translate-x-1/2 -translate-y-1/2 w-[51.375rem]" />
      <div className="absolute left-1/2 top-1/2 aspect-[1/1] border border-[rgba(202,198,221,0.1)] rounded-full transform -translate-x-1/2 -translate-y-1/2 w-[36.125rem]" />
      <div className="absolute left-1/2 top-1/2 aspect-[1/1] border border-[rgba(202,198,221,0.1)] rounded-full transform -translate-x-1/2 -translate-y-1/2 w-[23.125rem]" />
    </>
  );
};

export const BackgroundCircles = ({ parallaxRef }) => {
  return (
    <div className="absolute top-[-30rem] left-1/2 w-[78rem] aspect-[1/1] rounded-full border border-[rgba(202,198,221,0.1)] transform -translate-x-1/2">
      <Rings />

      {/* Moving background colored circle balls */}
      <MouseParallax strength={0.07} parallaxContainerRef={parallaxRef}>
        <div className="absolute bottom-1/2 left-1/2 h-1/2 w-[0.25rem] transform-origin-bottom transform rotate-[46deg]">
          <div className="-ml-[0.25rem] -mt-[9rem] h-[15px] w-[15px] rounded-full bg-gradient-to-b from-[#dd734f] to-[#1a1a32] transition-transform duration-500 ease-out" />
        </div>

        <div className="absolute bottom-1/2 left-1/2 h-1/2 w-[0.25rem] transform-origin-bottom transform rotate-[-56deg]">
          <div className="w-[1rem] h-[1rem] -ml-[1rem] -mt-[15rem] bg-gradient-to-b from-[#dd734f] to-[#1a1a32] rounded-full transition-transform duration-500 ease-out" />
        </div>

        <div className="absolute bottom-1/2 left-1/2 h-1/2 w-[0.25rem] transform-origin-bottom transform rotate-[54deg]">
          <div className="block w-[20px] h-[20px] -ml-[1px] -mt-[12.9rem] bg-gradient-to-b from-[#b9aedf] to-[#1a1a32] rounded-full transition-transform duration-500 ease-out" />
        </div>

        <div className="absolute bottom-1/2 left-1/2 h-1/2 w-[0.25rem] transform-origin-bottom transform rotate-[-65deg]">
          <div className="w-[15px] h-[15px] -ml-[1.5px] -mt-[10rem] bg-gradient-to-b from-[#b9aedf] to-[#1a1a32] rounded-full transition-transform duration-500 ease-out" />
        </div>

        <div className="absolute bottom-1/2 left-1/2 h-1/2 w-[0.25rem] transform-origin-bottom transform rotate-[-85deg]">
          <div className="w-[4rem] h-[4rem] -ml-[3rem] -mt-[3rem] bg-gradient-to-b from-[#88e5be] to-[#1a1a32] rounded-full transition-transform duration-500 ease-out" />
        </div>

        <div className="absolute bottom-1/2 left-1/2 h-1/2 w-[0.25rem] transform-origin-bottom transform rotate-[70deg]">
          <div className="w-[3rem] h-[3rem] -ml-[3rem] -mt-[5rem] bg-gradient-to-b from-[#88e5be] to-[#1a1a32] rounded-full transition-transform duration-500 ease-out" />
        </div>
      </MouseParallax>
    </div>
  );
};
