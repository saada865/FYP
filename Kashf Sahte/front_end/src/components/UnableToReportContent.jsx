import React from 'react'
import real from "../assets/icons8-tick-box-96.png"
import fake from "../assets/icons8-warning-96.png"
export default function ContentReportedSucessfully() {
  return (
    <div className=''>
<div className='flex items-center justify-center mb-5 lg:mb-[7rem]'>
<img src={fake} className='h-8 w-8 mr-2'/>
<h1 className='text-[#be1414] text-2xl font-extrabold'>Failed to Report Content</h1>   

</div>
    </div>
  )
}
