import React, { useState } from "react";
import axios from "axios";
import { Button, Upload } from "antd";
import { ImFolderUpload } from "react-icons/im";
import AutoSliderVideo from "./AutoSliderVideo";
import { ThemeContext } from "./ThemeContext";

export let VideoFileName = "";
export let VideoFileSize = 0;
export let VideoDuration = 0;
export let VideoFileFormat = "";
export let VideoImagePath="";
export let result = "";
export let confidence = "";

export default function UploadVideo() {
  const [detectClicked, setDetectClicked] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileList, setFileList] = useState([]);
  // const [isDarkMode, setIsDarkMode] = useState(true);
  const { isDarkMode, setIsDarkMode } = React.useContext(ThemeContext);

  const handleDetectClick = async () => {
    if (VideoFileName && fileList.length > 0) {
      const formData = new FormData();

      // Appending the uploaded file to formData
      formData.append("video", fileList[0].originFileObj);

      try {
        console.log("Sending video data to Node.js...");
        // Posting the video data to the server for processing
        const response = await axios.post(
          "http://localhost:8080/detection_video",
          formData
        );
        result = response.data.result;
        confidence = response.data.confidence;
        VideoImagePath=response.data.thermal_frame_base64;

        setDetectClicked(true);
        console.log("Connection to Node.js successful");
      } catch (error) {
        console.error("Error processing video:", error.response.data);
      }
    }
  };

  // Handling the File Upload
  const handleFileUpload = (newFileList) => {
    if (newFileList.length > 0) {
      const uploadedFile = newFileList[0].originFileObj;
      // Setting the Video Details
      VideoFileName = uploadedFile.name;
      VideoFileSize = (uploadedFile.size / (1024 * 1024)).toFixed(2);
      VideoFileFormat = uploadedFile.name.split(".").pop();

      const reader = new FileReader();
      reader.onload = (event) => {
        const audioVideoElement = document.createElement("video");
        audioVideoElement.src = event.target.result;

        // Extracting the Duration once metadata is loaded
        audioVideoElement.onloadedmetadata = () => {
          VideoDuration = Math.floor(audioVideoElement.duration);
        };
      };

      reader.readAsDataURL(uploadedFile);
      setFileUploaded(true);
      setFileList(newFileList);
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-[#131622] text-white" : "bg-[#F0F0F0] text-black"
      } font-Poppins p-10 `}
    >
      {/* Dark Mode Toggle Button */}

      {detectClicked ? (
        <div className="flex items-center justify-center">
          <AutoSliderVideo />
        </div>
      ) : (
        <div
          className={`${
            isDarkMode ? "backdrop-blur-2xl" : "backdrop-blur-md"
          } hover:shadow-2xl hover:shadow-cyan-500/80 rounded-lg p-5 xl:py-[10rem] md:py-[10rem] sm:py-[5rem]`}
        >
          <p className="xl:text-xl text-center mb-3">
            Empowering Authenticity: Upload Media, We'll Reveal Deepfake Lies!
          </p>
          <div className="flex items-center justify-center mb-5">
            <ImFolderUpload className="text-cyan-600 text-[4rem] animate-pulse" />
          </div>
          <div className="flex items-center justify-center mb-20">
            <Upload.Dragger
              className="font-bold hover:scale-105 duration-400 text-white font-Poppins w-[30rem] rounded-lg"
              action="http://localhost:8080/detection_video"
              showUploadList={{ showRemoveIcon: true }}
              accept=".mp4"
              listType="text"
              name="video"
              maxCount={1}
              onChange={({ fileList }) => {
                handleFileUpload(fileList);
              }}
            >
              <h1
                className={`${
                  isDarkMode ? "text-white" : "text-black"
                } text-[16px] font-light`}
              >
                DRAG FILES OR
              </h1>
              <br />
              <Button className="text-cyan-500 font-extrabold border-2 border-cyan-500 font-Poppins mb-5">
                Click Upload
              </Button>
              <br />
              <h1
                className={`${
                  isDarkMode ? "text-white" : "text-black"
                } text-[12px] font-light`}
              >
                format supported .mp4
              </h1>
            </Upload.Dragger>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="animate-bounce bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold rounded-md w-[14rem] hover:text-black"
              onClick={handleDetectClick}
              disabled={!fileUploaded || fileList.length === 0}
            >
              Detect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
