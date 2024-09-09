import React from "react";
import { ThemeContext } from "./ThemeContext"; // Assuming you have ThemeContext defined
import Icon_1 from "../assets/icons8-send-24.png";
import Icon_2 from "../assets/icons8-shield-24.png";
import Icon_3 from "../assets/icons8-star-24.png";
import { Link } from "react-router-dom";
export default function Features_Section() {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <div
      className={`h-full grid grid-cols-4 gap-12 font-Poppins lg:px-6 md:px-[3rem] ${
        isDarkMode ? "bg-[#131622] text-white" : "bg-[#F0F0F0] text-black"
      }`}
    >
      {/* ----------------------Child Grid # 1------------------------ */}
      <div className="md:max-2xl:col-span-2 col-span-4 lg:max-2xl:px-[7rem] px-4">
        <h1 className="text-4xl font-extrabold mb-7">
          Core Features that Kashf Sahte Offers
        </h1>
        <p className="mb-7">
          {" "}
          "Unleash the Power of Deep Neural Networks to Detect Deceptive Media
          with Precision. Take Control, Report, Locate, and Shield - Your Shield
          Against Deepfakes!"
        </p>
        <button
          className={`p-1 font-bold rounded-md w-[8rem] hover:text-${
            isDarkMode ? "black" : "white"
          } bg-gradient-to-r from-cyan-500 to-blue-500`}
        >
          {" "}
          <Link to="/detection">Get Started</Link>
        </button>
      </div>

      {/* ------------------------Child Grid # 2------------------------- */}
      <div className="col-span-4 md:max-2xl:col-span-2 px-4 lg:px-[6rem] mb-4">
        {/*-----------------------Feature # 1------------------------------  */}
        <div
          className={`hover:scale-105 duration-100 mb-7 rounded-md ${
            isDarkMode ? "bg-[#272a35]" : "bg-gray-100"
          }`}
        >
          <img className="p-1 inline" alt="Image Here" src={Icon_3} />
          <h3 className="inline font-bold ml-[0.5rem] text-xl">
            Deepfake Detection
          </h3>
          <p className="text-[12px] ml-[2.5rem] py-1">
            Utilizes advanced deep neural networks to analyze audio and video.
          </p>
        </div>

        {/*-----------------------Feature # 2------------------------------  */}
        <div
          className={`hover:scale-105 duration-100 mb-7 rounded-md ${
            isDarkMode ? "bg-[#272a35]" : "bg-gray-100"
          }`}
        >
          <img className="p-1 inline" alt="Image Here" src={Icon_2} />
          <h3 className="inline font-bold ml-1 text-xl">Report Content</h3>
          <p className="text-[12px] ml-[2.2rem] py-1">
            With reporting feature, users can flag and report suspicious
            content.
          </p>
        </div>

        {/*-----------------------Feature # 3------------------------------  */}
        <div
          className={`hover:scale-105 duration-100 mb-[10rem] rounded-md ${
            isDarkMode ? "bg-[#272a35]" : "bg-gray-100"
          }`}
        >
          <img className="p-1 inline" alt="Image Here" src={Icon_1} />
          <h3 className="inline text-xl font-bold ml-1">Locate Source</h3>
          <p className="text-[12px] ml-9 mb-1 py-1">
            {" "}
            We offer cutting-edge technology that traces the source of deepfakes
          </p>
        </div>
      </div>
    </div>
  );
}
