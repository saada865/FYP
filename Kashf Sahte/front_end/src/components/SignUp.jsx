import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import illustration from "../assets/undraw_sign_up_n6im.svg";
import illustration2 from "../assets/Artificial-Intelligence.svg";
import Logo from "../assets/original_logo.png";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function isPasswordStrong(password) {
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  return hasNumber && hasSpecialChar && hasUpperCase && hasLowerCase;
}

export default function SignUp() {
  // Declaring States

  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  // const [confirmPassword, setConfirmPassword] = React.useState("");

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState("");

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordStrong(data.password)) {
      setError(
        "Password must contain 8 characters, 1 number, 1 uppercase letter, 1 special letter (exludes @)"
      );
      setErrorField("password");
      return;
    } else {
      setError(""); // Clear any previous errors
      setErrorField("");
    }

    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/");
      console.log(res.message);
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

          {/*--------------- Login Page Link ADDED CODE -------------*/}

          {/*--------------- Google Authentication---------------- */}

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

            {/*------------- Element - 5  Input and Label--------------------*/}
            <label className=" ml-[1rem]   font-Poppins block text-white ">
              {" "}
              First Name
            </label>
            <div className=" flex ml-[1rem] mb-8 transform hover:scale-105 duration-300">
              <input
                type="text"
                name="firstname"
                onChange={handleChange}
                value={data.firstName}
                required
                className=" font-Poppins bg-[#f5f2f2] text-white focus:outline-none w-[20rem] h-[2rem] border border-[#908d91]  hover:border-[teal]  md:bg-[#131622] md:border-t-0 md:border-b-1 md:border-r-0 md:border-l-0"
              />
            </div>

            <label className=" ml-[1rem]   font-Poppins block text-white ">
              {" "}
              Last Name
            </label>
            <div className=" flex ml-[1rem] mb-8 transform hover:scale-105 duration-300">
              <input
                type="text"
                name="lastname"
                onChange={handleChange}
                value={data.lastName}
                required
                className=" font-Poppins bg-[#f5f2f2] text-white focus:outline-none w-[20rem] h-[2rem] border border-[#908d91]  hover:border-[teal]  md:bg-[#131622] md:border-t-0 md:border-b-1 md:border-r-0 md:border-l-0"
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
                className={`text-white font-Poppins focus:outline-none md:bg-[#131622] md:border-t-0 md:border-b-1 md:border-r-0 md:border-l-0 bg-[#f5f2f2] w-[20rem] h-[2rem] border ${
                  errorField === "password"
                    ? "border-red-500"
                    : "border-[#908d91]"
                } hover:border-[teal]`}
              />
            </div>
            {errorField === "password" && (
              <div className="text-red-500 ml-[1rem] mt-1">{error}</div>
            )}

            {/* ------------------Element - 4 Button---------------- */}
            <div className=" transform hover:scale-105 duration-300 flex ml-[1rem]  ">
              <button
                type="submit"
                className="hover:bg-[white] hover:text-[black] font-Poppins font-bold bg-[#33BBCF] w-[20rem] text-black rounded-full p-2 btn-lg"
              >
                Create Account
              </button>
            </div>
          </form>
          <div className=" flex mt-2 p-1 px-12">
            <h1 className="text-white font-Poppins md:max-lg:text-[14px]">
              Already have an account{" "}
              <Link to="/">
                <button className="text-[cyan] ">Login</button>
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
