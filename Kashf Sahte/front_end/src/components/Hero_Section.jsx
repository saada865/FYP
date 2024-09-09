import React from "react";
import { ThemeContext } from "./ThemeContext"; // Assuming you have ThemeContext defined
import Image from "../assets/undraw_visionary_technology_re_jfp7.svg";
import Image2 from "../assets/Get_Started.png";
import Image3 from "../assets/ai.png";
import { Link } from "react-router-dom";


export default function Hero_Section() {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <div className={`font-Poppins ${isDarkMode ? "text-white" : "text-black"}`}>
      <div
        className={`bg-${
          isDarkMode ? "[#131622]" : "[#F0F0F0]"
        } lg:p-10 w-full lg:h-[35rem] h-[28rem] grid grid-cols-4 lg:gap-20`}
      >
        <div className="col-span-4 lg:max-2xl:col-span-2">
          <h1 className="p-10 text-2xl md:max-2xl:text-4xl text-center md:mt-[1rem] mt-[2rem] font-bold">
            <span className={`text-${isDarkMode ? "cyan-500" : "black"}`}>
              Detect Deepfakes
            </span>{" "}
            with
            <pre className="font-Poppins font-bold">
              {" "}
              Artificial Intelligence
            </pre>
          </h1>
          <p className="lg:max-2xl:w-[25rem] w-[22rem] mx-auto">
            Unveiling the Future of Truth Protection! Introducing our
            groundbreaking Deepfake Detection System, powered by cutting-edge
            neural networks. Dive into a realm where authenticity reigns
            supreme.
          </p>
          <div className="flex items-center justify-center mt-6">
            <button
              className={`hover:bg-cyan-500 bg-${
                isDarkMode ? "white" : "black"
              } text-${
                isDarkMode ? "black" : "white"
              } font-bold rounded-full p-1 w-[13rem]`}
            >
                <Link to="/detection">Get Started</Link>
            </button>
          </div>
        </div>
        <div className="invisible flex justify-center lg:visible col-span-2">
          <img src={Image3} className="h-[24rem]" />
        </div>
      </div>
    </div>
  );
}
