import React from "react";
import real from "../assets/icons8-tick-box-96.png";

import { ImageFileName, ImageFileSize, ImageFormat, Image_Source } from "./ImageUpload";

export default function VideoDetectionResults() {
  // Map over Image_Source to create list items
  const imageLinksList = Image_Source.map((src, index) => (
    <li key={index}>
      <a href={src} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">
        {src}
      </a>
    </li>
  ));

  return (
    <div className="px-[2rem] lg:px-[5rem] py-4 font-Poppins text-white h-full bg-[#131622]">
      {/* Other component content */}
      <div className="flex items-center justify-center mb-5">
        <img src={real} alt="Verification Tick" className="h-8 w-8 mr-2" />
        <h1 className="text-[#1aa31a] text-2xl font-extrabold">
          Source Located
        </h1>
      </div>

      {/* File Information */}
      <div className="bg-[#272a35] flex justify-between mb-5 p-10 rounded-lg">
        <h1 className="font-extrabold">
          Name <span className="font-extralight ml-4">{ImageFileName}</span>
        </h1>
        <h1 className="font-extrabold">
          Size <span className="font-extralight ml-4">{ImageFileSize} MB</span>
        </h1>
        <h1 className="font-extrabold">
          Format <span className="font-extralight">{ImageFormat}</span>
        </h1>
      </div>

      {/* URLs Information */}
      <div className="bg-[#272a35] mb-10 lg:mb-[7rem] p-10 rounded-lg">
        <p className="text-center font-extrabold text-2xl  mb-8">
          Details
        </p>
        <p className="text-center font-extrabold text-xl mb-8">
          Given below are the links related to image you have uploaded.
        </p>
        {/* Render the list of image links */}
        <ul className="list-disc list-inside space-y-2">
          {imageLinksList}
        </ul>
      </div>
    </div>
  );
}
