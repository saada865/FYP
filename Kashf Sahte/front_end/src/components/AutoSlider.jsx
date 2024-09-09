import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DetectionResults from './DetectionResults';
import icon from "../assets/icons8-audio-wave-96.png";
import verify_content from "../assets/verify_content.svg"
import analyze_content from "../assets/icons8-analyzing-64.png"
import final_report from "../assets/icons8-graph-report-100.png"

function AutoSlider() {
  // State variables
  const [currentSlide, setCurrentSlide] = useState(0); // Keep track of currently displayed slide
  const [progress, setProgress] = useState(0); // Tracks the progress of the circular progress bar
  const [showDetectionResults, setShowDetectionResults] = useState(false); // Determines whether to show Detection Results or not
  const progressStep = 1; // Initial value of circular progress bar that increases after every 50ms

  // Data for each slide
  const slidesData = [
    { image_source:verify_content ,text: 'Verifying Content Format', sub_text: 'Checking the Content Format.' },
    { image_source:verify_content ,text: 'Analyzing Content Features', sub_text: 'In depth scanning of the content features in progress ' },
    { image_source:final_report , text: 'Generating Report', sub_text: 'Hang Tight we are about to reveal the content authenticity..' },
  ];

  // Effect to control automatic slide progression
  useEffect(() => {
    // Auto slider interval logic
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + progressStep);
      } else {
        if (currentSlide === slidesData.length - 1) {
          // Load Detection Results or perform action when progress reaches 100%
          setShowDetectionResults(true);
        } else {
          // Switch to the next slide
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
        }
        // Reset progress for the next slide
        setProgress(0);
      }
    }, 50);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [progress, slidesData.length, currentSlide]);

  // Render the component
  if (showDetectionResults) {
    return <DetectionResults />;
  }

  return (
    // Parent Div
    <div className="text-white font-Poppins flex items-center justify-center  bg-[#131622] h-screen  ">
      <div className="w-auto">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className={` ${
              index === currentSlide ? 'block' : 'hidden'
            }`}
          >
            {/* Progress Bar Div */}
            <div className='flex items-center justify-center'>
            <div className="  w-[12rem] h-[12rem] mb-10 ">
              <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                strokeWidth={8}
                styles={{
                  path: {
                    stroke: 'rgba(0, 188, 212)',
                    transition: 'stroke 0.2s ease 0s',
                  },
                  text: {
                    fill: 'white',
                    fontSize: '18px',
                  },
                  trail: { stroke: '#d6d6d6' },
                }}
              />
            </div>

            </div>
            
            {/* Text Div */}
            <div className="rounded-md text-center mb-8 ">
              <div className="flex items-center justify-center  ">
                <img src={slide.image_source} alt="Icon" />
              </div>
              <h1 className="text-center text-3xl font-semibold text-cyan-500 mb-2">{slide.text}</h1>
          
            <p className="text-center text-sm text-white ">{slide.sub_text}</p>
          
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AutoSlider;
