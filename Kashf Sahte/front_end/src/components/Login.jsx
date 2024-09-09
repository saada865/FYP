import { React, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import illustration from "../assets/undraw_sign_up_n6im.svg";
import illustration2 from "../assets/Girl-Sign-in.svg";
import Logo from "../assets/original_logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleGoogle = async (e) => {
    try {
      window.location("/");
    } catch (error) {
      console.log("Error in Google Login!!!!!");
    }
  };

  return (
    <div className="bg-[#131622] backdrop-blur-2xl h-screen flex items-center justify-center">
      {/* --------Grid Starting Point-------------- */}
      <div className=" bg-[#131622]  grid grid-cols-4 md:px-[2rem]  hover:shadow-2xl hover:shadow-cyan-500/50  ml-[2rem] mr-[2rem] rounded-lg  md:py-[2rem] ">
        {/*-----------------------Column with Form------------------ */}
        <div className="transition-all ease-in-out duration-700  md:col-span-2  col-span-4 md:px-[2rem] ">
          {/*--------------- Heading------------------ */}
          <h1 className=" text-3xl mb-6 text-white  font-Poppins font-bold ">
            <img src={Logo} className=" rounded-full inline w-[4rem] " /> Kashf
            Sahte
          </h1>

          {/*--------------- Sub-Heading -------------*/}
          <h3 className=" ml-[1rem] text-xl mb-4 text-white  font-Poppins">
            Create Account
          </h3>

          {/*------------------ Horizontal Rule --------------------- */}
          <div className=" invisible flex ml-[1rem] items-center mb-2">
            <hr className="bg-[#6e6d6d]   w-[10rem] h-1 "></hr>
            <h6>
              <pre> or </pre>
            </h6>
            <hr className="bg-[black]   w-[10rem] h-1 mr-[2rem] "></hr>
          </div>

          {/*--------------- Form ---------------*/}
          <form onSubmit={handleSubmit}>
            {/*-------------- Element - 1  Input and Label-------------*/}
            <label className="text-white ml-[1rem] block font-Poppins ">
              Email
            </label>
            <div className="mb-6 flex ml-[1rem] transform hover:scale-105 duration-300">
              <input
                type="email"
                // placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className="text-white focus:outline-none font-Poppins md:bg-[#131622] md:border-t-0 md:border-b-1 md:border-r-0 md:border-l-0 w-[20rem] h-[2rem] bg-[#f5f2f2] border border-[#908d91] hover:border-[teal]"
              />
            </div>
            {/*------------------ Element - 2  Input and Label-----------------*/}
            <label className=" ml-[1rem]  text-white  font-Poppins block">
              Password
            </label>
            <div className="mb-6 flex ml-[1rem] transform hover:scale-105 duration-300 ">
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className=" text-white  font-Poppins focus:outline-none md:bg-[#131622] md:border-t-0 md:border-b-1 md:border-r-0 md:border-l-0 bg-[#f5f2f2] w-[20rem] h-[2rem] border border-[#908d91]  hover:border-[teal]"
              />
            </div>{" "}
            {/*Error display*/}
            {error && <div className=" text-red-600 ">{error}</div>}
            {/* ------------------Element - 3 Button---------------- */}
            <div className=" transform hover:scale-105 duration-300 flex ml-[1rem] mb-4 ">
              <button className="hover:bg-[white] hover:text-[black] font-Poppins font-bold bg-[#33BBCF] w-[20rem] text-black rounded-full p-2 btn-lg">
                Sign In
              </button>
            </div>
          </form>
          <div className="px-[4rem] ">
            <h1 className="text-white font-Poppins text-[14px] ">
              Don't have an account{" "}
              <Link
                className="hover:scale-105 duration-500 ml-2 font-extrabold text-cyan-500"
                to="/signUp"
              >
                SignUp
              </Link>
            </h1>
          </div>
        </div>

        {/*------------------Illustration----------------- */}
        <div className=" md:px-[2rem] col-span-0 flex justify-center items-center invisible md:max-2xl:visible   md:col-span-2">
          <img src={illustration2}></img>
        </div>
      </div>
    </div>
  );
}
