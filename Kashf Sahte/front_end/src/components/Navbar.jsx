import React from "react";
import Logo from "../assets/original_logo.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const [toggle, setToggle] = React.useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="bg-[#131622] font-Poppins text-white p-1  ">
      <div className="  ml-[1rem] mr-[1rem]  py-4">
        <div className=" text-white flex items-center ">
          <img
            src={Logo}
            className="inline h-[3.5rem] w-[4rem] md:relative top-3"
            alt="Logo"
          />
          <h1 className="inline text-2xl font-bold md:text-3xl md:text-center md:relative top-4 p-2">
            Kashf <span className=" text-cyan-300">Sahte</span>
          </h1>

          {toggle ? (
            <AiOutlineClose
              onClick={handleToggle}
              className=" md:invisible inline absolute right-8 top-6  "
            ></AiOutlineClose>
          ) : (
            <AiOutlineMenu
              onClick={handleToggle}
              className="md:invisible inline absolute right-8 top-10  "
            ></AiOutlineMenu>
          )}

          <ul className=" hidden md:block md:flex items-center justify-center absolute right-[27rem] top-14 ">
            <li className="mr-[2rem] hover:text-cyan-500">
              <a href="#">Home</a>
            </li>

            <li className="mr-[2rem] hover:text-cyan-500">
              <a href="#">Detection</a>
            </li>

            <li className="mr-[2rem] hover:text-cyan-500">
              <a href="#">Subscription</a>
            </li>

            <li className=" hover:text-cyan-500">
              <a href="#">About Us</a>
            </li>
          </ul>
          <div className="hidden md:block flex items-center justify-center">
            <button className="text-black font-bold bg-cyan-500 rounded-md p-1 mt-[2rem] ml-[50rem] w-[8rem]">
              Sign Up
            </button>
          </div>
        </div>

        {/* Responsive Nvabar */}
        <div
          className={`md:invisible h-[25rem] ease-in-out duration-500 absolute left-[-100%] w-full  p-0 bg-[#131622] ${
            toggle ? "left-[0%]" : "left-[-100%]"
          }`}
        >
          <ul>
            <li
              className="mb-8 p-4
           ml-6 hover:text-[#33BBCF]"
            >
              <a href="#">Home</a>
            </li>
            <li className="mb-8 p-4  ml-6  hover:text-[#33BBCF]">
              <a href="#">Detection</a>
            </li>
            <li className="mb-8 p-4  ml-6  hover:text-[#33BBCF]">
              <a href="#">Subscription</a>
            </li>
            <li className="mb-8 p-4  ml-6  hover:text-[#33BBCF]">
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
