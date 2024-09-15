import React from 'react'

export default function Sub_Footer() {
  return (
    //---------------Parent Grid--------------------
    <div className='bg-[#131622] text-white font-Poppins'>
      <div className='grid grid-cols-4 rounded-3xl  gap-6 p-[8rem]'>


{/*------------------Child Grid # 1----------------- */}
<div className='text-center  col-span-4 md:col-span-2'>

<h1 className='font-extrabold text-3xl mb-3 text-cyan-500'>Let's try our service now !</h1>
<p>Stay one step ahead of deceptive illusions, embrace truth with Kashf Sahte Deepfake  Detection.</p>
</div>

{/*--------------------Child Grid # 2------------------- */}
<div className='col-span-4 md:col-span-2'> 
<div className='flex items-center justify-center py-8'>
<button className='  bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-bold rounded-md w-[8rem] hover:text-black  ' > Get Started </button>

</div>
</div>
</div>
    </div>
  )
}
