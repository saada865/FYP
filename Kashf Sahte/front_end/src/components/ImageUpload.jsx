import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Button, Upload } from 'antd';
import { ImFolderUpload } from 'react-icons/im';
import AutoSlider2 from './AutoSlider2';
import { ThemeContext } from './ThemeContext';

export let ImageFileName = '';
export let ImageFileSize = 0;
export let ImageFormat = '';
export let Image_Source = [];

export default function UploadImage() {
  const [detectClicked, setDetectClicked] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);
  const [imageLinks, setImageLinks] = useState([]); // State to store image links

  const handleDetectClick = async () => {
    if (fileList.length > 0) {
      const formData = new FormData();
      formData.append('image', fileList[0].originFileObj);
      formData.append('fileName', fileList[0].name); // Use the name of the uploaded file
      console.log('Uploading image to server...');
  
      try {
        const response = await axios.post('http://127.0.0.1:5000/search_image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('Image uploaded. Server is processing...');
        Image_Source = response.data.links; // Directly assign the links to Image_Source
        setImageLinks([...Image_Source]); // Use setImageLinks to trigger updates if needed elsewhere
        setDetectClicked(true);
      } catch (error) {
        console.error('Error searching for image:', error);
      }
    }
  };


  const handleFileUpload = (newFileList) => {
    if (newFileList.length > 0) {
      const uploadedFile = newFileList[0].originFileObj;
      
      // Set the file information
      ImageFileName = uploadedFile.name;
      ImageFileSize = (uploadedFile.size / (1024 * 1024)).toFixed(2); // Size in MB
      ImageFormat = uploadedFile.type.split('/').pop(); // Get the file format
      
      console.log(`File selected: ${ImageFileName}, Size: ${ImageFileSize}MB, Format: ${ImageFormat}`);
      setFileUploaded(true);
      setFileList(newFileList);
  
      // Read the file as a data URL and store it in Image_Source
      const reader = new FileReader();
      reader.onload = (e) => {
        Image_Source.push(e.target.result); // This will push the data URL into Image_Source
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-[#131622] text-white' : 'bg-[#F0F0F0] text-black'} font-Poppins p-10`}>
      {detectClicked ? (
        <div className="flex items-center justify-center">
          <AutoSlider2 />
        </div>
      ) : (
        <div className={`${isDarkMode ? 'backdrop-blur-2xl' : 'backdrop-blur-md'} hover:shadow-2xl hover:shadow-cyan-500/80 rounded-lg p-5 xl:py-[10rem] md:py-[10rem] sm:py-[5rem]`}>
          <p className="xl:text-xl text-center mb-3">
            Empowering Authenticity: Upload an Image, We'll Reveal the Truth!
          </p>
          <div className="flex items-center justify-center mb-5">
            <ImFolderUpload className="text-cyan-600 text-[4rem] animate-pulse" />
          </div>
          <div className="flex items-center justify-center mb-20">
            <Upload.Dragger
              className="font-bold hover:scale-105 duration-400 text-white font-Poppins w-[30rem] rounded-lg"
              action="http://localhost:8080/search_image"
              showUploadList={{ showRemoveIcon: true }}
              accept=".png"
              listType="text"
              name="image"
              maxCount={1}
              onChange={({ fileList: newFileList }) => handleFileUpload(newFileList)}
            >
              <p className={`${isDarkMode ? 'text-white' : 'text-black'} text-[16px] font-light`}>
                DRAG FILES OR
              </p>
              <Button className="text-cyan-500 font-extrabold border-2 border-cyan-500 font-Poppins mb-5">
                Click Upload
              </Button>
              <p className={`${isDarkMode ? 'text-white' : 'text-black'} text-[12px] font-light`}>
                format supported .png
              </p>
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
