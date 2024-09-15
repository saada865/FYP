import React from 'react'


 
export default function Stripe() {
    const [closePayment, setclosePayment]=React.useState(false);
 

    const handleClick=()=>{
        setclosePayment(!closePayment)
    }


  return (
    <div className={`${closePayment?"hidden bg-black bg-opacity-0 ":"visible"}font-Poppins fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 `}>

<div className={`${closePayment?"hidden":"visible"} bg-[#131622] rounded-lg p-10 border border-[cyan]`}>

<h1 className='text-[#44ec44] text-center text-bold mb-4'> Kindly Integrate Stripe</h1>


<div className='flex items-center justify-center '>
<button onClick={handleClick} className='w-[7rem] p-2 border border-white hover:border-[cyan] text-white text-bold rounded-md hover:scale-105 duration-500'> Close</button>

</div>
</div>

    </div>
  )
}
