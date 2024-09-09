import React, { useState } from 'react';
import axios from 'axios';
import { Button, Upload } from 'antd';
import { ImFolderUpload } from 'react-icons/im';
import { ThemeContext } from './ThemeContext';
import { Link } from "react-router-dom";

export default function AudioConverter() {
  const [conversionFileList, setConversionFileList] = useState([]);
  const [downloadLink, setDownloadLink] = useState('');
  const { isDarkMode } = React.useContext(ThemeContext);

  const handleConvertFile = async () => {
    if (conversionFileList.length > 0) {
      const file = conversionFileList[0].originFileObj;
      console.log('Uploading file:', file); // Log the file details
    
      const formData = new FormData();
      formData.append('file', file);
      console.log('FormData entries:', [...formData]); // Additional logging to ensure FormData is correct
    
      try {
        const response = await axios.post('http://localhost:8080/convert_to_flac', formData, {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        setDownloadLink(url);
      } catch (error) {
        console.error('Error converting file:', error);
        console.log('Error details:', error.response); // Log detailed error information
      }
    }
  };
  
  
  return (
    <div className={`${isDarkMode ? "bg-[#131622] text-white" : "bg-[#F0F0F0] text-black"} font-Poppins p-10`}>
      <div className="backdrop-blur-2xl hover:shadow-2xl hover:shadow-cyan-500/80 rounded-lg p-5 xl:py-[10rem] md:py-[10rem] sm:py-[5rem]">
        <p className="xl:text-xl text-center mb-3">
          Convert audio file to FLAC format
        </p>
        <div className="flex items-center justify-center mb-5">
          <ImFolderUpload className="text-cyan-600 text-[4rem] animate-pulse" />
        </div>
        <div className="flex items-center justify-center mb-20">
        <Upload.Dragger
  className="font-bold hover:scale-105 duration-400 text-white font-Poppins w-[30rem] rounded-lg"
  accept="audio/*"
  action="http://localhost:8080/convert_to_flac"
  listType="text"
  maxCount={1}
  beforeUpload={(file) => {
    // Directly use the file object provided by antd Upload
    setConversionFileList([{ originFileObj: file }]);
    // Prevent default behavior of upload
    return false;
  }}
  // Remove the onChange prop if you are not using it
>
            <h1 className={`${isDarkMode ? "text-white" : "text-black"} text-[16px] font-light`}>
              DRAG FILES OR
            </h1>
            <br />
            <Button className="text-cyan-500 font-extrabold border-2 border-cyan-500 font-Poppins mb-5">
              Click Upload
            </Button>
            <br />
            <h1 className={`${isDarkMode ? "text-white" : "text-black"} text-[12px] font-light`}>
              all formats supported
            </h1>
          </Upload.Dragger>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="animate-bounce bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold rounded-md w-[14rem] hover:text-black"
            onClick={handleConvertFile}
            disabled={conversionFileList.length === 0}
          >
            Convert to Flac
          </button>
          <button
            className="animate-bounce bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold rounded-md w-[14rem] hover:text-black ml-[2rem]"
            onClick={handleConvertFile}
            disabled={conversionFileList.length === 0}
          >
             <Link to="/detection">Detect Audio</Link>
          </button>
        </div>
        {downloadLink && (
          <div className="flex items-center justify-center mt-5">
            <a
              href={downloadLink}
              download="converted_audio.flac"
              className="animate-bounce bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-white font-bold rounded-md hover:text-black"
            >
              Download Converted File
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
