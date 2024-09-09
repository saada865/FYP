import React from "react";
import ticks from "../assets/ticks.png";
import saad from "../assets/Saad-modified.png";
import supervisor from "../assets/Supervisor-modified.png";
import instagram from "../assets/icons8-instagram-50.png";
import facebook from "../assets/icons8-facebook-50.png";
import linkedIn from "../assets/icons8-linked-in-50.png";
import instagram_1 from "../assets/instagram_gradient.png";
import linkedIn_1 from "../assets/linkedIn_gradient.png";
import facebook_1 from "../assets/facebook_gradient.png";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiOutlineFacebook } from "react-icons/ai";
import { AiOutlineLinkedin } from "react-icons/ai";
import huzaifa from "../assets/self-modified.png"

import { ThemeContext } from "./ThemeContext"; // Assuming you have ThemeContext defined
export default function Team() {
  const { isDarkMode } = React.useContext(ThemeContext);

  // Define the common styles for the Child Grid
  const childGridStyles = `${
    isDarkMode ? "bg-[#272a35]" : "bg-[#f0f0f0]"
  } md:mb-[10rem] mt-8 md:max-2xl:p-9 p-5 col-span-6 md:col-span-2 lg:col-span-2 h-[20rem] w-[17rem] md:h-auto md:w-auto hover:border hover:border-[#333] hover:scale-105 duration-150 rounded-lg`;

  return (
    <div
      className={`${
        isDarkMode ? "bg-[#131622] text-white" : "bg-white text-[#333] "
      } font-Poppins`}
    >
      <div
        className={`${
          isDarkMode ? "bg-[#131622]" : "bg-white"
        } font-Poppins md:px-[5rem]`}
      >
        <h1 className="mb-4 font-extrabold lg:max-2xl:text-3xl text-2xl text-center">
          Our Kashf Sahte Development Team
        </h1>
        <p className="text-[11px] lg:max-2xl:text-[14px] text-center">
          "Innovate. Create. Elevate. Together, We Code the Future!"
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="lg:px-[8rem] py-5 md:px-[3rem] grid grid-cols-6 gap-4">
          <div className={childGridStyles}>
            <div className="flex justify-center items-center mb-3">
              <img
                src={huzaifa}
                className="h-14 w-14 border border-cyan-500 rounded-full"
              />
            </div>
            <h1 className="text-center mb-1">Huzaifa Tariq</h1>
            <h4 className="text-cyan-500 text-center text-[13px] mb-3">
              Web Developer
            </h4>
            <p className="text-center mb-7 text-[12px]">
              "Digital Dreamweaver: Crafting Brilliance in Lines of Code!"
            </p>
            <div className="flex items-center justify-center">
              <a href="#">
                <AiOutlineInstagram className=" text-[#897e7e] hover:text-cyan-500 text-3xl mr-2"></AiOutlineInstagram>
              </a>
              <a href="#">
                <AiOutlineLinkedin className=" text-[#897e7e] hover:text-cyan-500 text-3xl mr-2"></AiOutlineLinkedin>
              </a>
              <a href="#">
                <AiOutlineFacebook className="text-[#897e7e] hover:text-cyan-500 text-3xl mr-2"></AiOutlineFacebook>
              </a>
            </div>
          </div>

          {/* --- Child Grid # 2 --- */}
          <div className={childGridStyles}>
            <div className="flex justify-center items-center mb-3">
              <img
                src={supervisor}
                className="h-14 w-14 border border-cyan-500 rounded-full"
              />
            </div>
            <h1 className="text-center mb-1">Mr. Rashid Mukhtar</h1>
            <h4 className="text-cyan-500 text-center text-[13px] mb-3">
              Supervisor
            </h4>
            <p className="text-center mb-7 text-[12px]">
              "Guiding Visionary: Nurturing Talent, Leading Innovation, One
              Project at a Time!"
            </p>
            <div className="flex items-center justify-center">
              <a href="#">
                <AiOutlineInstagram className="text-[#897e7e] hover:text-cyan-500 text-3xl mr-2"></AiOutlineInstagram>
              </a>
              <a href="#">
                <AiOutlineLinkedin className="text-[#897e7e] hover:text-cyan-500 text-3xl mr-2"></AiOutlineLinkedin>
              </a>
              <a href="#">
                <AiOutlineFacebook className="text-[#897e7e] hover:text-cyan-500 text-3xl mr-2"></AiOutlineFacebook>
              </a>
            </div>
          </div>

          {/* --- Child Grid # 3 --- */}
          <div className={childGridStyles}>
            <div className="flex justify-center items-center mb-3">
              <img
                src={saad}
                className="h-14 w-14 border border-cyan-500 rounded-full"
              />
            </div>
            <h1 className="text-center mb-1">Saad Ahmed</h1>
            <h4 className="text-cyan-500 text-center text-[13px] mb-3">
              Web Developer
            </h4>
            <p className="text-center mb-7 text-[12px]">
              "Code Magician: Weave Wonders through Algorithms and Logic!"
            </p>
            <div className="flex items-center justify-center">
              <a href="#">
                <AiOutlineInstagram className="text-[#897e7e] hover:text-cyan-500 text-3xl mr-2"></AiOutlineInstagram>
              </a>
              <a href="#">
                <AiOutlineLinkedin className="text-[#897e7e] hover:text-cyan-500 text-3xl mr-2"></AiOutlineLinkedin>
              </a>
              <a href="#">
                <AiOutlineFacebook className="text-[#897e7e] hover:text-cyan-500 text-3xl mr-2"></AiOutlineFacebook>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
