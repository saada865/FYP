import React from 'react'
import real_or_fake from "../assets/icons8-yes-or-no-100 (1).png"
import audio_file from "../assets/icons8-audio-file-64.png"
import detection from "../assets/icons8-detection-100.png"
import video_file from "../assets/icons8-video-file-64.png"


export default function () {
  return (
//-------------------Main Div---------------------
    <div className='bg-[#131622] font-Poppins text-white'>
      {/*-------------------Child Div # 1------------------  */}
      <div className='bg-[#131622] p-12  md:px-[12rem] h-screen'>
        <div className='bg-[#1e2025] p-10 rounded-lg'>

          {/*----------------------Text & Image---------------- */}
          <h1 className='text-center'>"Empowering Authenticity: Upload Media, 
          We'll Reveal Deepfake Lies!"</h1>
          <div className='flex items-center justify-center'>
            <img src={real_or_fake} className=' animate-bounce h-14 w-14 mt-4 mb-4'/>
          
          </div>
          
          {/* ----------------Input File Section ------------------------ */}
              <div className='p-6  mb-5 flex items-center justify-center border border-dashed border-white rounded-md '>
                  <input type="file" />
                </div>
          

        </div>
        
          {/*------------------------Detection Button-------------- */}
          <div className='flex mt-10 justify-center'>
              <button className='  bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold rounded-md w-[18rem] hover:text-black ' > Detect</button>
          </div>

      </div>
     
     
    </div>
  )
}


