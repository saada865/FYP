import React from 'react'
import real from "../assets/icons8-tick-box-96.png"
import DetectionResults from './DetectionResults';



export default function ContentReportedSucessfully() {
  const [hide,sethide]=React.useState(false);
  const handleClose=()=>{

    
    sethide(true)

  }

 



  return (
    <div className={`${hide?'hidden':null}  rounded-lg p-5 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70`}>
<div className='bg-[#131622] p-10 rounded-lg'>
<h1 className='text-[#1aa31a] text-2xl font-extrabold mb-5 align-middle'> <img src={real} className='inline h-8 w-8 mr-2 align-middle'/>Content Reported Successfully</h1>   
<div className='flex items-center justify-center'>
<button onClick={handleClose} className='hover:scale-105 duration-300   bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold hover:font-extrabold rounded-md w-[8rem] hover:text-[#13529b] '> Close</button>
</div>
{
  hide?<DetectionResults></DetectionResults>:null
}
</div>
    </div>

)
}
