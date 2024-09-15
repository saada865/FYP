import React, { useState } from 'react';
import { Button, Upload } from 'antd';
import { ImFolderUpload } from 'react-icons/im';
import AutoSlider from './AutoSlider';

// Initialize variables for uploaded file name and size
export let uploadedFileName = ''; // Will store the uploaded file name
export let uploadedFileSize = 0; // Will store the uploaded file size in MB

export default function UploadContent3() {
  const [detectClicked, setDetectClicked] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleDetectClick = () => {
    setDetectClicked(true);
  };

  const handleFileUpload = (fileList) => {
    setFileUploaded(fileList.length > 0);

    if (fileList.length > 0) {
      const uploadedFile = fileList[0];
      uploadedFileName = uploadedFile.name;
      uploadedFileSize = (uploadedFile.size / (1024 * 1024)).toFixed(2); // Convert to MB
    }
  };

  return (
    <div className='bg-[#131622] font-Poppins text-white p-10'>
      {/* Slide Show & Initial Upload Screen */}
      {detectClicked ? (
        // Load Slider
        <div className='flex items-center justify-center'>
          <AutoSlider />
        </div>
      ) : (
        // Initial Upload Page
        <div className='backdrop-blur-2xl hover:shadow-2xl hover:shadow-cyan-500/80 rounded-lg p-5'>
          <p className='text-center mb-3'>
            Empowering Authenticity: Upload Media, We'll Reveal Deepfake Lies!
          </p>
          <div className='flex items-center justify-center mb-5'>
            <ImFolderUpload className='text-cyan-600 text-[4rem] animate-pulse' />
          </div>

          {/* File Uploading Handler */}
          <div className='flex items-center justify-center mb-20'>
            <Upload.Dragger
              className='font-bold hover:scale-105 duration-400 text-white font-Poppins w-[30rem] rounded-lg'
              showUploadList={{ showRemoveIcon: true }}
              accept='.flac,.mp4'
              listType='text'
              maxCount={1}
              action={''}
              onChange={({ fileList }) => {
                handleFileUpload(fileList);
              }}
            >
              <h1 className='text-[16px] font-light'>DRAG FILES OR</h1>
              <br />
              <Button className='text-cyan-500 font-extrabold border-2 border-cyan-500 font-Poppins mb-5'>
                Click Upload
              </Button>
              <br />
              <h1 className='text-[12px] font-light'>format supported .flac, .mp4</h1>
            </Upload.Dragger>
          </div>

          {/* Detect Button */}
          <div className='flex items-center justify-center'>
            <button
              className='animate-bounce bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold rounded-md w-[14rem] hover:text-black'
              onClick={handleDetectClick}
              disabled={!fileUploaded}
            >
              Detect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
