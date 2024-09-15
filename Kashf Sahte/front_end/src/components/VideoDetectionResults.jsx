import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import fake from "../assets/icons8-warning-96.png";
import real from "../assets/icons8-tick-box-96.png";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import LocateSource from "./ImageUpload";
import ReportContent from "./ReportContent_Popup";
import {
  VideoFileName,
  VideoFileSize,
  VideoDuration,
  VideoFileFormat,
  result,
  confidence,
  VideoImagePath,
} from "./UploadVideo";

import RealVideo from "../assets/RealVideo.png";

export default function VideoDetectionResults() {
  const [message, setMessage] = useState("");
  const [feature, setFeature] = useState(false);
  const [showLocateSource, setShowLocateSource] = useState(false);

  const navigate = useNavigate(); // Initialize the navigate function
  const handleSourceLocation = () => {
    navigate("/locatesource"); // Use navigate to change the path
  };

  useEffect(() => {
    // This will run when the component is mounted
    handleLoadEmail();
  }, []); // Empty dependency array to run this effect only once

  //---------------------------  Close Handle Report Download --------------------------------------

  const handleLoadEmail = async () => {
    const userToken = localStorage.getItem("token");
    // setMessage("No token found");

    if (userToken) {
      try {
        // Split the token into header, payload, and signature
        const [, payload] = userToken.split(".");

        // Decode the payload
        const decodedPayload = JSON.parse(atob(payload));

        // Extract the user's email (assuming email is a field in the token)
        const userEmail = decodedPayload.email;

        // Now you have the user's email
        // setMessage("Success in email test");

        // Call the backend to check if the user is subscribed
        const response = await fetch(
          `http://localhost:8080/api/checkSubscription/${userEmail}`
        );
        if (!response.ok) {
          throw new Error("Failed to check subscription status");
        }
        const subscriptionData = await response.json();
        const isSubscribed = subscriptionData.subscribed;
        // isSubscribed ? setFeature(true) : setFeature(false);
        if (isSubscribed) {
          setFeature(true);
        } else {
          setFeature(false);
        }

        // Now you have the subscription status (isSubscribed) for the user

        setMessage(userEmail);
      } catch (error) {
        setMessage("Failed to email test");
        setMessage(error.message);
      }
    }
  };

  //--------------------- Use State Declaration ----------------
  const [deepfake, setDeepfake] = React.useState(true);
  const [reportContent, setreportContent] = React.useState(false);

  //--------------------- Handle Report Download----------------------
  const handleDownload = async () => {
    const content = document.getElementById("report-content");
    if (content) {
      try {
        const canvas = await html2canvas(content, {
          scale: 1,
          useCORS: true,
          backgroundColor: "#131622",
          onclone: (clonedDoc) => {
            const downloadButton = clonedDoc.getElementById("download-button");
            if (downloadButton) {
              downloadButton.style.display = "none";
            }
            const locatesource = clonedDoc.getElementById("locate-source");
            if (locatesource) {
              locatesource.style.display = "none";
            }

            clonedDoc.body.style.backgroundColor = "#131622";
          },
        });

        const imgData = canvas.toDataURL("image/png");

        // Debug: Log the image data URL to see if it's correct
        console.log("Image Data URL:", imgData);

        // Check if the image data URL is valid
        if (imgData.length < 100) {
          console.error(
            "Error: The image data URL is too short, might be invalid."
          );
          return;
        }

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.setFillColor(19, 22, 34);
        pdf.rect(
          0,
          0,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight(),
          "F"
        );
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("report.pdf");
      } catch (error) {
        // Handle errors more gracefully
        console.error("Error generating PDF", error);
      }
    } else {
      console.error("Element to capture not found");
    }
  };

  //------------------------Handle Clicks-------------------------
  const handleReportContent = async () => {
    setreportContent(!reportContent);
  };

  // Screenshot Code
  const takeScreenshotAndDownload = () => {
    html2canvas(document.body).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "report-screenshot.png";
      link.href = image;
      document.body.appendChild(link); // Append to body
      link.click();
      document.body.removeChild(link); // Clean up
    });
  };

  return (
    //-------------Parent Div---------------
    <div
      id="report-content"
      className="px-[2rem] lg:px-[5rem] py-4 font-Poppins text-white h-full bg-[#131622]"
    >
      {/* --------------Deepfake Verfication------------- */}
      {/* Deepfake Verification */}
      {result === "FAKE" ? (
        <div className="flex items-center justify-center mb-5 ">
          <img src={fake} className="h-8 w-8 mr-2" />
          <h1 className="text-[#be1414] text-2xl font-extrabold">
            Deepfake Video Detected
          </h1>
        </div>
      ) : (
        <div className="flex items-center justify-center mb-5 ">
          <img src={real} className="h-8 w-8 mr-2" />
          <h1 className="text-[#1aa31a] text-2xl font-extrabold">
            Deepfake Video Not Detected
          </h1>
        </div>
      )}

      {/*--------------Initial File Information-------------- */}
      <div className="bg-[#272a35] flex justify-between mb-5  p-10 rounded-lg">
        <h1 className="font-extrabold">
          Name <span className="font-extralight ml-4">{VideoFileName}</span>
        </h1>
        <h1 className="font-extrabold">
          Size <span className="font-extralight ml-4">{VideoFileSize} MB</span>
        </h1>
      </div>

      {/*---------Model Accuracy Section-------------  */}
      <div className="bg-[#272a35]  p-4 rounded-lg mb-10 ">
        <p className="text-center font-extrabold text-2xl text-cyan-500 mb-8">
          Model Information
        </p>
        <div className="flex items-center justify-between p-4 mb-10">
          <div className="  ">
            <h1 className="font-extrabold mb-10 ">
              Accuracy <span className="font-extralight">{confidence}</span>
            </h1>
            <h1 className="font-extrabold">
              Format <span className="font-extralight">{VideoFileFormat}</span>
            </h1>
          </div>

          <div className="">
            <h1 className="font-extrabold mb-10">
              Duration{" "}
              <span className="font-extralight">{VideoDuration} secs</span>
            </h1>
          </div>
        </div>
      </div>

      {/*------------ Spectrogram Images---------- */}
      <div className="bg-[#272a35] mb-10 lg:mb-[7rem] p-10 rounded-lg ">
        <p className="text-center font-extrabold text-2xl text-cyan-500 mb-8">
          Details
        </p>
        <div className="flex flex-wrap -mx-2 justify-center items-center">
          {/* Conditionally render Real Audio Sample if predictedLabel is "bonafide" */}

          <div className="px-2 w-full lg:w-1/2 mb-4">
            <p className="font-extrabold text-xl text-cyan-500 mb-2 text-center">
              Real Video Sample
            </p>
            <img
              src={RealVideo}
              className="block mx-auto w-auto h-[25rem]"
              alt="Real Audio Sample"
            />
          </div>

          {/* Uploaded Audio */}
          <div className="px-2 w-full lg:w-1/2 mb-4">
            <p className="font-extrabold text-xl text-cyan-500 mb-2 text-center">
              Uploaded Video
            </p>
            <img
              src={`data:image/png;base64,${VideoImagePath}`}
              alt="Spectrogram"
              className="block mx-auto w-auto h-[25rem]" // Set the same height as Real Audio Sample
            />
          </div>
        </div>

        <p className="text-center">
          Mel-Scaled Spectrograms, like musical scores for ears, represent audio
          frequencies with 'Mel' scaling to mimic human hearing sensitivity. In
          deepfake detection, they serve as lie detectors for audiovisual
          content. These spectrogams expose inconsistencies in manipulated audio
          by comparing unique audio fingerprints with genuine samples, catching
          even subtle anomalies. They ensure harmony between audio and visual
          elements, safeguarding authenticity in a world of digital deception.
        </p>
        <div className="flex justify-center items-center mt-4">
          <button
            id="download-button"
            onClick={handleDownload}
            className="hover:scale-105 duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-4 font-bold rounded-md hover:text-[#13529b]"
          >
            Download PDF
          </button>
        </div>
      </div>

      {result === "FAKE" ? (
        <div className="flex flex-wrap mt-10 mb-5">
          <button
            onClick={handleReportContent}
            disabled={!feature} // Disable the button if feature is false
            className={`hover:scale-105 duration-300 border border-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold rounded-md w-[8rem] ${
              !feature && "pointer-events-none opacity-50"
            } hover:text-[red] mr-8`}
          >
            Report Content
          </button>
          <button
            onClick={takeScreenshotAndDownload}
            disabled={!feature} // Disable the button if feature is false
            className={`hover:scale-105 duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold ${
              !feature && "pointer-events-none opacity-50"
            } rounded-md w-[8rem] hover:text-[#13529b] mr-8`}
          >
            Download Report
          </button>
          <button
            id="locate-source"
            onClick={handleSourceLocation}
            disabled={!feature} // Disable the button if feature is false
            className={`hover:scale-105 duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold ${
              !feature && "pointer-events-none opacity-50"
            } rounded-md w-[8rem] hover:text-[#13529b] mr-8`}
          >
            Locate Source
          </button>
        </div>
      ) : null}
      {/* ------------------------Report Content PopUp------------------ */}
      {reportContent ? <ReportContent></ReportContent> : null}
    </div>
  );
}
