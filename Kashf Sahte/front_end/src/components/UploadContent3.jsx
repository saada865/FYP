import React, { useState } from "react";
import axios from "axios";
import { Button, Upload } from "antd";
import { ImFolderUpload } from "react-icons/im";
import AutoSlider from "./AutoSlider";
import { ThemeContext } from "./ThemeContext";


export let uploadedFileName = "";
export let uploadedFileSize = 0;
export let uploadedDuration = 0;
export let uploadedSampleRate = 0;
export let uploadedFileFormat = "";
export let spectrogramImageBase64 = ""; // Updated to store the base64 image data
export let modelAccuracy = "";
export let predictedLabel = "";
export let spectrogramImage = "";

export default function UploadContent3() {
  const [detectClicked, setDetectClicked] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const { isDarkMode, setIsDarkMode } = React.useContext(ThemeContext);

  const [fileList, setFileList] = useState([]);

  const handleDetectClick = async () => {
    if (uploadedFileName && fileList.length > 0) {
      const formData = new FormData();

      formData.append("file", fileList[0].originFileObj);

      try {
        console.log("Sending audio data to Node.js...");
        const response = await axios.post(
          "http://localhost:8080/detection",
          formData
        );

        spectrogramImageBase64 = response.data.spectrogramImageBase64; // Updated to store the base64 image data
        predictedLabel = response.data.predicted_label;
        modelAccuracy = response.data.confidence_score;
        setDetectClicked(true);

        console.log("Connection to Node.js successful");
      } catch (error) {
        console.error("Error processing audio:", error.response.data);
      }
    }
  };

  const handleFileUpload = (newFileList) => {
    if (newFileList.length > 0) {
      const uploadedFile = newFileList[0].originFileObj;
      uploadedFileName = uploadedFile.name;
      uploadedFileSize = (uploadedFile.size / (1024 * 1024)).toFixed(2);
      uploadedFileFormat = uploadedFile.name.split(".").pop();

      const reader = new FileReader();
      reader.onload = (event) => {
        const audioVideoElement = document.createElement("audio");
        audioVideoElement.src = event.target.result;

        audioVideoElement.onloadedmetadata = () => {
          uploadedDuration = Math.floor(audioVideoElement.duration);
          uploadedSampleRate = audioVideoElement.mozSampleRate || 44100;
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
      } font-Poppins p-10  `}
    >
      {detectClicked ? (
        <div className="flex items-center justify-center">
          <AutoSlider />
        </div>
      ) : (
        <div className="backdrop-blur-2xl hover:shadow-2xl hover:shadow-cyan-500/80 rounded-lg p-5 xl:py-[10rem] md:py-[10rem] sm:py-[5rem] ">
          <p className="xl:text-xl text-center mb-3">
            Empowering Authenticity: Upload Media, We'll Reveal Deepfake Lies!
          </p>
          <div className="flex items-center justify-center mb-5">
            <ImFolderUpload className="text-cyan-600 text-[4rem] animate-pulse" />
          </div>
          <div className="flex items-center justify-center mb-20">
            <Upload.Dragger
              className="font-bold hover:scale-105 duration-400 text-white font-Poppins w-[30rem] rounded-lg"
              action="http://localhost:8080/detection"
              showUploadList={{ showRemoveIcon: true }}
              accept="*"
              listType="text"
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
                flac format supported only
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
