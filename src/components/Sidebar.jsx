import {
  FaHome,
  FaFire,
  FaMusic,
  FaCompass,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-black text-white w-64 h-screen  flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold p-5">
          <FaMusic style={{ display: "inline-block", color: "red" }} />
          <span style={{ color: "red" }}> Dream</span>Music
        </h1>
        <nav className="flex flex-col gap-6 px-5 mt-10">
          <p>Menu</p>
          <a
            href="#"
            className="flex items-center gap-4 text-lg  hover:text-red-500"
          >
            <FaHome color="red" /> Home
          </a>
          <a
            href="#"
            className="flex items-center gap-4 text-lg hover:text-red-500"
          >
            <FaFire color="red" /> Trends
          </a>
          <a
            href="#"
            className="flex items-center gap-4 text-lg hover:text-red-500"
          >
            <FaMusic color="red" /> Library
          </a>
          <a
            href="#"
            className="flex items-center gap-4 text-lg hover:text-red-500"
          >
            <FaCompass color="red" /> Discover
          </a>
        </nav>
      </div>
      <div className="flex flex-col gap-4 px-5 mb-10">
        <p className="uppercase text-sm">General</p>
        <a
          href="#"
          className="flex items-center gap-4 text-lg hover:text-red-500"
        >
          <FaCog color="red" /> Settings
        </a>
        <a
          href="#"
          className="flex items-center gap-4 text-lg hover:text-red-500"
        >
          <FaSignOutAlt color="red" /> Log Out
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
