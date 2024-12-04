import michaelJackson from "../assets/images/michael-jackson.jpg";
import background from "../assets/images/Background.png";
import { MdVerified } from "react-icons/md";

const Main = () => {
  return (
    <div className="relative w-96 md:w-9/12  h-40 md:h-64 rounded-lg mx-auto mt-16">
      {/* Background Image */}
      <img
        src={background}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {/* Text Content */}
      <div className="absolute z-10 top-1/2 left-8 transform -translate-y-1/2">
        <div className="flex items-center">
          <MdVerified
            size={"18px"}
            style={{ display: "inline-block", color: "aqua" }}
          />
          <span className="text-xs px-2 py-1 font-semibold">
            Verified Artist
          </span>
        </div>
        <h1 className="text-lg md:text-4xl font-bold">Michael Jackson</h1>
        <p className="text-gray-300 mt-1">27,852,501 monthly listeners</p>
      </div>

      {/* Artist Image */}
      <img
        src={michaelJackson}
        alt="Michael Jackson"
        className="absolute bottom-0 right-0 md:right-20  w-60 md:w-96 h-92 z-10 object-contain"
      />
    </div>
  );
};

export default Main;
