import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import fake from "../assets/icons8-warning-96.png";
import real from "../assets/icons8-tick-box-96.png";
import spectogram from "../assets/spectogram.png";
import ReportContent from "./ReportContent_Popup";
import RealAudio from "../assets/Real_Audio.png";
import {
  uploadedFileName,
  uploadedFileSize,
  uploadedDuration,
  uploadedSampleRate,
  uploadedFileFormat,
} from "./UploadContent3";

import {
  modelAccuracy,
  predictedLabel,
  spectrogramImageBase64,
} from "./UploadContent3";

export default function DetectionResults() {
  const [message, setMessage] = useState("");
  const [feature, setFeature] = useState(false);

  useEffect(() => {
    // This will run when the component is mounted
    handleLoadEmail();
  }, []); // Empty dependency array to run this effect only once

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

  //----------------------- Varaibles Declaration ---------------

  const accuracy = "";
  const format = "";
  const duration = "";
  const sample_rate = "";
  const spectogram_image = "";
  //--------------------- Handle Report Download----------------------
  const handleDownload = () => {
    const content = document.getElementById("report-content");
    if (content) {
      html2canvas(content, {
        scale: 1, // Try setting scale to 1 to capture with actual size
        useCORS: true,
        backgroundColor: "#131622", // Set the background color for the canvas here
        onclone: (clonedDoc) => {
          // Hide the download button in the cloned document
          const downloadButton = clonedDoc.getElementById("download-button");
          if (downloadButton) {
            downloadButton.style.display = "none";
          }
          // Set the background color for the body
          clonedDoc.body.style.backgroundColor = "#131622";
        },
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4", // Use A4 size
          });
          // Calculate the scale to fit the image to the pdf page
          const imgWidth = pdf.internal.pageSize.getWidth();
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          // Set the PDF background color
          pdf.setFillColor(19, 22, 34); // RGB value of #131622
          pdf.rect(
            0,
            0,
            pdf.internal.pageSize.getWidth(),
            pdf.internal.pageSize.getHeight(),
            "F"
          );
          // Add the image on top of the background
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          pdf.save("report.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF", error);
        });
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
      className="px-[2rem] lg:px-[5rem] py-4 font-Poppins text-white h-full  bg-[#131622]"
    >
      {/* --------------Deepfake Verfication------------- */}
      {/* Deepfake Verification */}
      {predictedLabel === "spoof" ? (
        <div className="flex items-center justify-center mb-5 ">
          <img src={fake} className="h-8 w-8 mr-2" />
          <h1 className="text-[#be1414] text-2xl font-extrabold">
            Deepfake Audio Detected
          </h1>
        </div>
      ) : (
        <div className="flex items-center justify-center mb-5 ">
          <img src={real} className="h-8 w-8 mr-2" />
          <h1 className="text-[#1aa31a] text-2xl font-extrabold">
            Deepfake Audio Not Detected
          </h1>
        </div>
      )}

      {/*--------------Initial File Information-------------- */}
      <div className="bg-[#272a35] flex justify-between mb-5  p-10 rounded-lg">
        <h1 className="font-extrabold">
          Name <span className="font-extralight ml-4">{uploadedFileName}</span>
        </h1>
        <h1 className="font-extrabold">
          Size{" "}
          <span className="font-extralight ml-4">{uploadedFileSize} MB</span>
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
              Accuracy <span className="font-extralight">{modelAccuracy}</span>
            </h1>
            <h1 className="font-extrabold">
              Format{" "}
              <span className="font-extralight">{uploadedFileFormat}</span>
            </h1>
          </div>

          <div className="">
            <h1 className="font-extrabold mb-10">
              Duration{" "}
              <span className="font-extralight">{uploadedDuration} secs</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Spectrogram Images Section with Tailwind classes for background, padding, margin, and rounded corners */}
      <div className="bg-[#272a35] p-10 rounded-lg mb-10 lg:mb-28">
        <p className="text-center font-extrabold text-2xl text-cyan-500 mb-8">
          Details
        </p>
        {/* Flex container with wrapping and spacing for responsiveness */}
        <div className="flex flex-wrap -mx-2 justify-center items-center">
          {/* Conditionally render Real Audio Sample if predictedLabel is "bonafide" */}
          {/* {predictedLabel === "bonafide" ? ( */}
          <div className="px-2 w-full lg:w-1/2 mb-4">
            <p className="font-extrabold text-xl text-cyan-500 mb-2 text-center">
              Real Audio Sample
            </p>
            <img
              src={RealAudio}
              className="block mx-auto w-auto h-[25rem]"
              alt="Real Audio Sample"
            />
          </div>
          {/* ) : null} */}

          {/* Uploaded Audio */}
          <div className="px-2 w-full lg:w-1/2 mb-4">
            <p className="font-extrabold text-xl text-cyan-500 mb-2 text-center">
              Uploaded Audio
            </p>
            <img
              src={`data:image/png;base64,${spectrogramImageBase64}`}
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

      {predictedLabel == "spoof" ? (
        <div className="flex mt-10 mb-5 ">
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
        </div>
      ) : null}

      {/* ------------------------Report Content PopUp------------------ */}
      {reportContent ? <ReportContent></ReportContent> : null}
    </div>
  );
}
