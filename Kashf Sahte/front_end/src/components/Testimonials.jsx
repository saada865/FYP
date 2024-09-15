import React from "react";
import { ThemeContext } from "./ThemeContext"; // Assuming you have ThemeContext defined
import ticks from "../assets/ticks.png";
import person_1 from "../assets/women-modified.png";
import person_2 from "../assets/man-modified.png";
import person_3 from "../assets/man_2-modified.png";

export default function Testimonials() {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <div
      className={`${
        isDarkMode ? "bg-[#131622] text-white" : "bg-[#F0F0F0] text-[#333] "
      } font-Poppins`}
    >
      {/* Heading & Logo Section */}
      <div
        className={`md:px-[5rem] ${
          isDarkMode ? "bg-[#131622]" : "bg-[#F0F0F0]"
        }`}
      >
        <h1 className="mb-4 font-extrabold lg:max-2xl:text-3xl text-2xl text-center">
          What are people saying about us
        </h1>
        <p className="text-[11px] lg:max-2xl:text-[14px] text-center">
          "Guardians of Authenticity, your ally in an era of deepfakes."
        </p>
      </div>

      {/* Testimonial Cards Section */}
      <div className="flex items-center justify-center">
        <div className="lg:px-[8rem] py-5 md:px-[3rem] grid grid-cols-6 gap-4">
          {/* Testimonial Card 1 */}
          <div
            className={`${
              isDarkMode ? "bg-[#272a35]" : "bg-[#E0E0E0]"
            } md:mb-[10rem] mt-8 md:max-2xl:p-9 p-5 col-span-6 md:col-span-2 lg:col-span-2 h-[20rem] w-[17rem] md:h-auto md:w-auto hover:border hover:border-[#ccc] hover:scale-105 duration-150 rounded-lg`}
          >
            <img src={ticks} className="h-8 w-9 mb-4" />
            <p className="mb-3 text-[12px] md:text-[11px]">
              "...a must have for anyone who values truth and authenticity in
              the digital realm."
            </p>
            <img src={person_1} className="h-12 w-13 mb-4" />
            <h1 className="md:text-[10px]">Joana Simpson</h1>
            <h1 className="md:text-[10px]">Social Media Influencer</h1>
          </div>

          {/* Testimonial Card 2 */}
          <div
            className={`${
              isDarkMode ? "bg-[#272a35]" : "bg-[#E0E0E0]"
            } md:mb-[10rem] mt-8 md:max-2xl:p-9 p-5 col-span-6 md:col-span-2 lg:col-span-2 h-[20rem] w-[17rem] md:h-auto md:w-auto hover:border hover:border-[#ccc] hover:scale-105 duration-150 rounded-lg`}
          >
            <img src={ticks} className="h-8 w-9 mb-4" />
            <p className="mb-6 text-[12px] md:text-[11px]">
              "...Deepfake detection website has been a game-changer for me.
              Thank you for this incredible tool!."
            </p>
            <img src={person_2} className="h-12 w-13 mb-4" />
            <h1 className="md:text-[10px]">Steve Mark</h1>
            <h1 className="md:text-[10px]">CNN Journalist</h1>
          </div>

          {/* Testimonial Card 3 */}
          <div
            className={`${
              isDarkMode ? "bg-[#272a35]" : "bg-[#E0E0E0]"
            } mb-10 md:mb-[10rem] mt-8 md:max-2xl:p-9 p-5 col-span-6 md:col-span-2 lg:col-span-2 h-[20rem] w-[17rem] md:h-auto md:w-auto hover:border hover:border-[#ccc] hover:scale-105 duration-150 rounded-lg`}
          >
            <img src={ticks} className="h-8 w-9 mb-4" />
            <p className="mb-6 text-[12px] md:text-[11px]">
              "...As a content creator, ensuring the authenticity of my work is
              paramount. Highly recommended!"
            </p>
            <img src={person_3} className="h-12 w-13 mb-4" />
            <h1 className="md:text-[10px]">Tony Blair</h1>
            <h1 className="md:text-[10px]">Software Developer</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
