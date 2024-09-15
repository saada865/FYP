import React, { useState } from "react";
import cards from "../assets/icons8-sparkle-100.png";
import tick from "../assets/white tick.png";
import Stripe from "./Stripe";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm2 from "./PaymentForm2";
import { ThemeContext } from "./ThemeContext";

const stripePromise = loadStripe(
  "pk_test_51NlGPSGpXLtThc6pd234WxAv4QdeeSO7HU381paIqemN6SJDPZ68l3hWc8mSHvjtOpQHvvHFs7KqgyDbuvkBQA3G00ENuvrd7t"
); // Replace with your actual Stripe publishable key

export default function Subscription() {
  //----------------Use States-----------------------
  //------------------Handle Click Function------------------

  // make payment
  const handleClick = () => {
    console.log("Payment Initiated");
  };

  const [message, setMessage] = useState("");
  // const [isDarkMode, setIsDarkMode] = useState(true);

  const { isDarkMode, setIsDarkMode } = React.useContext(ThemeContext);

  return (
    //------------------------Parent Div----------------------
    <div
      className={`${
        isDarkMode ? "bg-[#131622] text-white" : " bg-[#F0F0F0] text-black"
      } font-Poppins`}
    >
      {/*-------------------------- Heading & Sub-Heading -------------------  */}
      <div className=" text-center px-[2rem] pt-8">
        <p className="text-2xl mb-4">
          <img src={cards} className="mr-4 inline h-8 w-8" />
          Weve got a pricing plan that’s perfect for you
        </p>
        <p className="text-[14px] ">
          Detect, Defend, and Stay Informed with Our Powerful Deepfake Detection
          Subscription.
        </p>
      </div>

      {/*------------------------------ Cards -------------------------------  */}
      {/* -------------------Parent Grid # 1----------------------- */}
      <div className="flex items-center justify-center ">
        <div className="md:px-[10rem] lg:px-[20rem] grid grid-cols-6 pt-4 gap-4">
          {/*-------------------Child Grid # 1--------------------------*/}
          <div
            className={`text-center mt-2 p-5 col-span-6 md:col-span-3 lg:col-span-3 h-[20rem] w-[17rem] md:h-auto md:w-auto ${
              isDarkMode ? "bg-[#272a35]" : "bg-gray-100 text-black"
            } hover:border ${
              isDarkMode ? "hover:border-white" : "hover:border-gray-600"
            } hover:scale-105 duration-150 rounded-lg`}
          >
            <h1 className="font-extrabold text-3xl mb-12">Basic</h1>
            <p className="mb-4 text-[14px]">
              Shield Against Deceptive Realities – Get Started with Our Basic
              Deepfake Detection Subscription!.
            </p>
            <p className="font-extrabold text-3xl mb-[2rem]">$0</p>
          </div>

          {/*-------------------Child Grid # 2--------------------------*/}
          <div
            className={`text-center p-5 mt-2 col-span-6 md:col-span-3 lg:col-span-3 h-[20rem] w-[17rem] md:h-auto md:w-auto ${
              isDarkMode ? "bg-[#272a35]" : "bg-gray-100 text-black"
            } hover:border ${
              isDarkMode ? "hover:border-white" : "hover:border-gray-600"
            } hover:scale-105 duration-150 rounded-lg`}
          >
            <h1 className="font-extrabold text-3xl mb-10">Pro</h1>
            <p className="mb-5 text-[14px]">
              Mastering Reality: Experience the Ultimate Deepfake Defense with
              Pro+ Power!.
            </p>
            <p className="font-extrabold text-3xl mb-[2rem]">$10</p>
            <div className="flex justify-center items-center">
              <button
                onClick={handleClick}
                className="animate-bounce bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold rounded-full w-[12rem] hover:text-black"
              >
                <PaymentForm2 />
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>

      {/*------------------------- Features of Subscription -------------------*/}

      <div className="  h-screen px-[1rem] py-[6rem] flex justify-center">
        <div className="  grid grid-cols-6 grid-rows-5 gap-2 md:max-2xl:gap-5  ">
          {/*------------------Feature Heading----------------------------  */}
          <div className="hover:scale-105 duration-500 col-span-2 row-starts-0 row-end-1 border border-[cyan] border-t-0 border-l-0 border-r-0 py-2">
            <div className="flex items-center justify-center">
              <h1 className="text-xl font-extrabold">Features</h1>
            </div>
          </div>
          {/*------------------------------Feature - 1---------------------- */}
          <div className="col-span-2 row-starts-1 row-end-2  ">
            <div className="flex  justify-center">
              <h1 className="">Audio Detection</h1>
            </div>
          </div>

          {/*------------------------------Feature - 2---------------------- */}
          <div className="col-span-2 row-starts-2 row-end-3 ">
            <div className="flex  justify-center">
              <h1>Video Detection</h1>
            </div>
          </div>

          {/*------------------------------Feature - 3---------------------- */}
          <div className="col-span-2 row-starts-3 row-end-4 ">
            <div className="flex  justify-center">
              <h1>Report Content</h1>
            </div>
          </div>

          {/*------------------------------Feature - 4---------------------- */}
          <div className="col-span-2 row-starts-4 row-end-5">
            <div className="flex  justify-center">
              <h1>Locate Content Source</h1>
            </div>
          </div>

          {/*------------------Basic Plan----------------------------  */}
          <div className="hover:scale-105 duration-500  col-span-2 row-starts-0 row-end-1 border border-[cyan] border-t-0 border-l-0 border-r-0 py-2">
            <div className="flex items-center justify-center">
              <h1 className="text-xl font-extrabold">Basic Plan</h1>
            </div>
          </div>

          {/*------------------Feature -1----------------------------  */}
          <div className="col-span-2 row-starts-1 row-end-2 ">
            <div className="flex items-center justify-center ">
              <img src={tick} className="h-7 w-7" />
            </div>
          </div>

          {/*------------------Feature -2----------------------------  */}
          <div className="col-span-2 row-starts-2 row-end-3 ">
            <div className="flex items-center justify-center ">
              <img src={tick} className="h-7 w-7" />
            </div>
          </div>

          {/*------------------Feature -3----------------------------  */}
          <div className="col-span-2 row-starts-3 row-end-4 ">
            <div className="flex items-center justify-center ">
              <h1 className="font-extrabold text-3xl">-</h1>
            </div>
          </div>

          {/*------------------Feature -4----------------------------  */}
          <div className="col-span-2 row-starts-4 row-end-5 ">
            <div className="flex items-center justify-center ">
              <h1 className="font-extrabold text-3xl">-</h1>
            </div>
          </div>

          {/*-----------------------Pro Plan------------------------*/}
          <div className="hover:scale-105 duration-500 col-span-2 row-starts-0 row-end-1 border border-[cyan] border-t-0 border-l-0 border-r-0 py-2">
            <div className="flex items-center justify-center">
              <h1 className="text-xl font-extrabold">Pro Plan</h1>
            </div>
          </div>

          {/*------------------Feature -1----------------------------  */}
          <div className="col-span-2 row-starts-1 row-end-2">
            <div className="flex items-center justify-center ">
              <img src={tick} className="h-7 w-7" />
            </div>
          </div>

          {/*------------------Feature -2----------------------------  */}
          <div className="col-span-2 row-starts-2 row-end-3 ">
            <div className="flex items-center justify-center ">
              <img src={tick} className="h-7 w-7" />
            </div>
          </div>

          {/*------------------Feature -3----------------------------  */}
          <div className="col-span-2 row-starts-3 row-end-4">
            <div className="flex items-center justify-center ">
              <img src={tick} className="h-7 w-7" />
            </div>
          </div>

          {/*------------------Feature -4----------------------------  */}
          <div className="col-span-2 row-starts-4 row-end-5">
            <div className="flex items-center justify-center ">
              <img src={tick} className="h-7 w-7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

