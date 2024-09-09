import React from "react";
import Logo from "../assets/original_logo.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Link } from "react-router-dom";
import AudioConverter from "./AudioConverter";

export default function Navbar_Original() {
  const [toggle, setToggle] = React.useState(false);
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    // ----------------Main Grid Cols Div---------------------------------
    <div className="lg:py-10 pt-5 font-Poppins text-white  grid grid-cols-7 gap-2 bg-[#131622] ">
      {/*----------------Navbar Toggler-----------------*/}
      <div className="md:hidden  absolute right-[5rem] top-[1.5rem]">
        {toggle ? (
          <AiOutlineClose
            onClick={handleToggle}
            className="inline  "
          ></AiOutlineClose>
        ) : (
          <AiOutlineMenu
            onClick={handleToggle}
            className="inline  "
          ></AiOutlineMenu>
        )}
      </div>

      {/*---------------First Grid Col------------------  */}
      <div className=" ml-[2rem] col-span-4 md:col-span-2 md:max-2xl:col-span-2 ">
        {/* -----------------------Logo & Product Name----------------------------- */}

        <img
          src={Logo}
          className="inline  h-[2rem] w-[2rem] md:max-2xl:h-[3rem] md:max-2xl:w-[3.5rem]  align-middle"
          alt="Logo"
        />
        <h1 className="inline  md:max-lg:text-[18px] text-[18px] font-bold md:text-3xl p-1 lg:p-2 align-middle ">
          Kashf <span className=" text-cyan-300">Sahte</span>
        </h1>

        {/*-------------------------------Responsive Navabar-------------------- */}

        <ul
          className={`border-2 border-r-0 border-[#10b8ce] visible md:invisible p-4 ease-in duration-300 bg-[#131622] text-white absolute top-[6rem] w-full h-full ${
            toggle ? "left-[0%]" : "left-[-100%]"
          } z-50`}
        >
          <li className="mb-9  hover:text-cyan-400">
            <Link to="/">Home</Link>
          </li>

          <li className="mb-9 hover:text-cyan-400">
            <Link to="/audioConverter">Detection Audio</Link>
          </li>

          <li className="mb-9 hover:text-cyan-400">
            <Link to="/detection_video">Detection Video</Link>
          </li>

          <li className="mb-9 hover:text-cyan-400 ">
            <Link to="/subscription">Subscription</Link>
          </li>

          <li className="mb-9 hover:text-cyan-400">
            <Link to="/about">About</Link>
          </li>
          <li className="mb-9 hover:text-cyan-400">
            <button onClick={toggleDarkMode} className=" text-cyan-500">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
          <li className="mb-9 hover:text-cyan-400">
            <Link to="/Login">Log In</Link>
          </li>

          <li className=" hover:text-cyan-400">
            <Link onClick={handleLogout} to="/SignUp">
              Log Out
            </Link>
          </li>
        </ul>
      </div>

      {/*--------------------Second Grid Column--------------------  */}
      <div className=" flex items-center justify-center md:visible invisible lg:max-2xl:col-span-3 col-span-3 ">
        {/*-------------------------- Non Responsive Navbar------------------------------- */}
        <ul className="flex gap-5">
          <li className="  hover:text-cyan-400">
            <Link to="/">Home</Link>
          </li>

          <li className=" hover:text-cyan-400">
            <Link to="/audioConverter">Detect Audio</Link>
          </li>

          <li className=" hover:text-cyan-400">
            <Link to="/detection_video">Detect Video</Link>
          </li>

          <li className=" hover:text-cyan-400 ">
            <Link to="/subscription">Subscription</Link>
          </li>

          <li className=" hover:text-cyan-400 ">
            <Link to="/about">About</Link>
          </li>
          <li>
            <button onClick={toggleDarkMode} className=" text-cyan-500">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
        </ul>
      </div>

      {/*-------------------Third Grid Column--------------------------- */}
      <div className="  md:visible invisible md:max-2xl:col-span-2 flex items-center justify-center gap-2  ">
        <button className="md:max-lg:text-[12px]  w-[40%] md:w-[40%] bg-white text-black hover:bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold rounded-md  hover:text-white">
          <Link to="/Login">Log In</Link>
        </button>

        <button
          className=" w-[40%]  md:max-lg:text-[12px] bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold rounded-md  hover:text-black  "
          onClick={handleLogout}
        >
          <Link to="/SignUp">Log Out</Link>
        </button>
      </div>
    </div>
  );
}
