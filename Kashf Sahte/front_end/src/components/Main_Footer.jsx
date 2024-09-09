import React from 'react'
import Logo from "../assets/logo_black.png"
import {AiOutlineCopyright} from "react-icons/ai"
import instagram from "../assets/icons8-instagram-50.png"
import facebook from "../assets/icons8-facebook-50.png"
import linkedIn from "../assets/icons8-linked-in-50.png"
import github from "../assets/icons8-github-50.png"
import { AiOutlineInstagram } from 'react-icons/ai'
import { AiFillLinkedin } from 'react-icons/ai'
import {AiFillGithub} from "react-icons/ai"
import { AiOutlineFacebook } from 'react-icons/ai'
import {AiOutlineLinkedin} from 'react-icons/ai'
import { Link } from 'react-router-dom';


export default function() {
  return (
    <div className='bg-black text-white font-Poppins  '>

       {/*-------------Parent Grid-----------------*/}
    <div className='grid grid-cols-6 p-10 gap-6'>

    {/*-------------Child Grid # 1-----------------*/}
     <div className='col-span-2 '>
     <img src={Logo} className='inline h-[2rem] w-[2rem]  align-middle' alt='Logo' />
    <h1 className='inline text-[13px] font-bold md:text-3xl p-1 lg:p-2 align-middle '>Kashf <span className=' text-cyan-300'>Sahte</span></h1>
        
        <div className='flex mt-5 md:max-2xl:ml-1 ml-2 '>
        <a href="#"><AiOutlineInstagram className='text-white hover:text-cyan-500 text-[15px] md:max-2xl:text-2xl mr-2'></AiOutlineInstagram></a>
        <a href="#"><AiOutlineLinkedin className='text-white hover:text-cyan-500 text-[15px] md:max-2xl:text-2xl mr-2  rounded-full'></AiOutlineLinkedin></a>
        <a href="#"><AiOutlineFacebook className='text-white hover:text-cyan-500 text-[15px] md:max-2xl:text-2xl mr-2 rounded-full'></AiOutlineFacebook></a>
        <a href="#"><AiFillGithub className='text-white hover:text-cyan-500 text-[15px] md:max-2xl:text-2xl mr-2 rounded-full'></AiFillGithub></a>

        </div>
     </div>


      {/*-------------Child Grid # 2-----------------*/}
      <div className=' col-span-2'>
     <h1 className='font-extrabold mb-4'>Useful Links</h1>
     <ul>
     <li className='text-[10px] md:max-2xl:text-[14px] mb-2'>
     <Link to="/home" className="hover:text-cyan-400">Home</Link> 
     </li>

     <li className='text-[10px] md:max-2xl:text-[14px]  mb-2   '>
     <Link to="/detection" className="hover:text-cyan-400">Detection</Link> 
     </li>

     <li className='text-[10px] md:max-2xl:text-[14px]  mb-2  '>
     <Link to='/subscription' className="hover:text-cyan-400">Subscription</Link>   
     </li>

     <li className='text-[10px] md:max-2xl:text-[14px]    '>
     <Link to='/about' className="hover:text-cyan-400">About</Link>   
     </li>
     </ul>
     </div>
    
     {/*-------------Child Grid # 3-----------------*/}
     <div className='col-span-2'>
     <h1 className='font-extrabold mb-4'>Head Office</h1>
     <p className='text-[10px] md:max-2xl:text-[12px] mb-3'>CS Department, Comsats ,Islamabad</p>
     <p className='text-[10px]  md:max-2xl:text-[12px] mb-3'>Kashf_Sahte@gmail.com</p>
     <p className=' text-[10px] md:max-2xl:text-[12px] '>+92300-02123132</p>
     </div>
    
        
        
    
     
     
 


    </div>
    <div className='flex justify-center items-center'>
    <hr className='  w-[90%] h-2 '></hr>
    </div>
   

{/* ---------------Content Below Horizontal Rule------------ */}
<div className='flex items-center justify-center'>
{/* -----------------Horizontal Rule----------- */}
<h1 className=''>  <AiOutlineCopyright className='inline mr-2 text-center'></AiOutlineCopyright>Kashf Sahte 2023</h1>

</div>



    </div>
  )
}
