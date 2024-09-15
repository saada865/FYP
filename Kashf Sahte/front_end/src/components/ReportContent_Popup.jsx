import React from "react";
import ContentReportedSucessfully from "./ContentReportedSucessfully";
import UnableToReportContent from "./UnableToReportContent";
import html2canvas from "html2canvas";

export default function ReportContent_Popup() {
  //---------------------Declaring State-----------------
  const [hide, sethide] = React.useState(false);
  const [report, setreport] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [textContent, settextContent] = React.useState("");
  //---------------------Handle Click Functions----------
  const handleCancel = () => {
    sethide(true);
  };
  const handleReport = async () => {
    if (email !== "" && textContent !== "") {
      setreport(true);

      html2canvas(document.body).then(async (canvas) => {
        const image = canvas.toDataURL("image/png").split(",")[1]; // Get the base64 part

        // Now send this along with the email
        try {
          const response = await fetch("http://localhost:8080/api/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: email,
              text: textContent,
              image: image, // Include the screenshot image in base64 format
            }),
          });

          if (response.ok) {
            console.log("Email sent successfully.");
          } else {
            console.error("Failed to send email.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });
    }
  };

  return (
    //--------------------Parent Div-----------------------------
    <div>
      <div
        className={`${hide ? "hidden" : null} ${
          report ? "hidden" : null
        }  fixed inset-0 flex justify-center items-center bg-black bg-opacity-70`}
      >
        {/*---------------------Actual Report Content Section-------------------  */}
        <div
          className={`   bg-[#131622] p-6 rounded-md shadow-md text-extrabold`}
        >
          <div className="grid p-5">
            {/*--------------------Input Field------------------------*/}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="text-[12px]  hover:scale-105 duration-300 mb-5 bg-[#131622] rounded-md text-bold border border-[#00BCD4] p-2 "
            />

            {/*--------------------Text Area---------------------------*/}
            <textarea
              value={textContent}
              onChange={(e) => settextContent(e.target.value)}
              placeholder="URL of content"
              maxlength="20"
              className=" text-[12px] hover:scale-105 duration-300 mb-5 bg-[#131622] rounded-md text-bold border border-[#00BCD4] p-2"
            ></textarea>

            {/*-------------------------Buttons---------------------  */}
            <div className="flex mt-10 mb-5 ">
              <button
                onClick={handleReport}
                className="hover:scale-105 duration-300 border border-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold rounded-md w-[8rem] hover:text-[red] mr-8"
              >
                {" "}
                Report
              </button>
              <button
                onClick={handleCancel}
                className="hover:scale-105 duration-300   bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold hover:font-extrabold rounded-md w-[8rem] hover:text-[#13529b] "
              >
                {" "}
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {report ? (
        <ContentReportedSucessfully></ContentReportedSucessfully>
      ) : null}
    </div>
  );
}
