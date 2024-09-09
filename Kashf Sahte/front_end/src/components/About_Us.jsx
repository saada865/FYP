import React from "react";
import Illustration from "../assets/undraw_visionary_technology_re_jfp7.svg";
import SignUp from "./SignUp";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

export default function About_Us() {
  const { isDarkMode, setIsDarkMode } = React.useContext(ThemeContext);
  return (
    //-----------------------Parent Div-----------------------------------
    <div
      className={`font-Poppins px-[4rem] h-screen py-[10rem] ${
        isDarkMode ? "bg-[#131622] text-white" : "bg-white text-black"
      }`}
    >
      {/*----------------------------Grid Begining----------------------------*/}
      <div className="grid grid-cols-4 gap-4 h-auto">
        {/*----------------------------Logout Saad----------------------------*/}

        {/*------------------------Text Section-----------------------------*/}
        <div className="col-span-4 md:col-span-4 lg:col-span-2 p-3 ">
          <h1
            className={`font-bold text-3xl mb-10 ${
              isDarkMode ? "" : "text-gray-800"
            }`}
          >
            Defying Deceit in the Digital Realm: Welcome to{" "}
            <span
              className={`font-Poppins ${
                isDarkMode ? "text-[#00BCD4]" : "text-[#007B8A]"
              }`}
            >
              Kashf Sahte
            </span>{" "}
            - Your Trusted Sentinel Against Deepfakes.
          </h1>
          <p
            className={`mb-4 text-[15px] ${isDarkMode ? "" : "text-gray-700"}`}
          >
            At Kashf Sahte, we empower you with the ultimate defense against
            deceptive digital landscapes. Utilizing deep neural networks, our
            groundbreaking deepfake detection system harnesses cutting-edge AI
            to meticulously analyze and{" "}
            <span className="font-extrabold">
              authenticate audio and video content
            </span>
            , guaranteeing an untainted reality unmarred by manipulation.
          </p>

          <p className="mb-4 text-[15px]">
            Through an intuitive website and a seamles integrated Google
            extension, users are endowed not only with the ability to impeccably
            discern authenticity but also to effectively trace sources and
            promptly{" "}
            <span className="font-extrabold">
              report potential misinformation
            </span>
            .
          </p>

          <p className="mb-4 text-[15px]">
            {" "}
            In doing so, we strive to cultivate a safer online ecosystem for
            all, fortified by the relentless dedication of Kashf Sahte.
          </p>
        </div>

        {/*------------------------Illustration------------------------------*/}
        <div className="hidden lg:block col-span-4 md:col-span-2  ">
          <div className="flex items-center justify-center">
            <img src={Illustration} className="h-[27rem] w-[27em]" />
          </div>
        </div>
      </div>
    </div>
  );
}
