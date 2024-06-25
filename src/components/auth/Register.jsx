import { useState, useEffect, useRef } from "react";
import axios from "axios";
import google from "../../assets/icons8-google-48.png";
import facebook from "../../assets/tabler-icon-brand-facebook.png";
import "./register.css";
import Navbar from "../home/Navbar";
import Footer from "../../components/home/Footer";
import Otp from "./Otp";
import "../../index.css";
const Login = () => {
  // state declaration
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");
  const [username, setUserName] = useState("");
  const [isLogin, isNotLogin] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  // useEffect(() => {
  // useRef.current.focus
  // }, [])

  const url = "https://scentreel-be.onrender.com/api/v1/auth/register";
  const payload = {
    email: email,
    password: password,
    fullName: fullName,
    username: username,
  };

  const handleSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });
      setisLoading(false);

      console.log(response);
      const setToken = (response) => {
        const token = response.data.accesstoken;
        localStorage.setItem("token", token);
        console.log(token);
        if (response.status == 201) {
          setPopup(true);
          if (popup) {
            return (
              <div>
                {" "}
                <Otp />{" "}
              </div>
            );
          }
        }
      };

      console.log(response.data.message);
      setMessage(response.data.message);
      setToken(response);
    } catch (error) {
      console.error(error.response.data);
      setisLoading(false);
      setMessage(error.response.data.message);
    }
  };

  if (popup) {
    return (
      <div>
        {" "}
        <Otp />{" "}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className=" text-center ">
        <Navbar />
        <div className="mt-[25%]">
          <span className="loader mt-14 p-5 m-2"></span>
          <p className="mt-4">please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#608A7D] sm:w-[1440px] w-[100vw] h-[1831px] top-[-195px] left-[434px]">
      <Navbar />

      <div className="sm:flex top-8 sm:ml-[28rem]">
        <div className="bg-white sm:w-[906px] w-[100vw] sm:top-[380px] top-[190px] left-[214px]   sm:h-[870px] sm:left-[434px] border-[1px] border-[#608A7D] rounded-[20px] ">
          <div className="w-[100vw] h-full pr-4 mr-4">
            {" "}
            <div>
              <h1 className="text-center p-4 uppercase font-bold mt-6 text-[2rem]">
                become a member <hr />
              </h1>
            </div>
            {/* google registration section */}
            <section className="w-full  sm:flex sm:ml-0 ml-8 mt-8 gap-10">
              <div className="w-[270px] h-[40px] top-[566px] left-[896px] rounded-[10px] border-[1px] flex gap-[1rem] capitalize font-semibold border-[#608A7D]">
                <div className=" bg-[#608A7D]">
                  <img
                    src={google}
                    className="m-2 mb-2 p-1 w-8"
                    alt="google logo"
                  />
                </div>
                <h4 className="mt-2 font-bold">register with google</h4>
              </div>
              <div className="w-[270px] h-[40px] mt-6 top-[566px] left-[896px] rounded-[10px] border-[1px] flex gap-[1rem] capitalize font-semibold border-[#608A7D]">
                <div className=" bg-[#608A7D]">
                  <img
                    src={facebook}
                    className="m-2 mb-2 p-1 w-8"
                    alt="google logo"
                  />
                </div>
                <h4 className="mt-2 font-bold">register with facebook</h4>
              </div>
            </section>
            <div>
              <h3 className="capitalize mt-8 text-center">or </h3>
            </div>
            <section className="w-[100vw] mt-[] p-6">
              <div className="form sm:flex gap-2  p-4">
                <label htmlFor="email" className="flex capitalize ">
                  <h4> email</h4>
                </label>

                <input
                  type="text"
                  value={email}
                  autoComplete="on"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className=" w-[330px] mt-2 sm: rounded border p-2  border-black h-10"
                />
              </div>
              <div className="sm:flex p-4 gap-2 ">
                <label htmlFor="password">
                  <h4>password</h4>
                </label>
                <input
                  type="password"
                  value={password}
                  autoComplete="on"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  className=" w-[330px] mt-2 rounded pl-2 px-2 py-2 border border-black h-10"
                />
              </div>
              <div className="sm:flex p-4 gap-2">
                <label htmlFor="fullName">
                  <h4>fullName</h4>
                </label>
                <input
                  type="text"
                  value={fullName}
                  autoComplete="on"
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                  required
                  className=" w-[330px] mt-2 rounded pl-2 px-2 py-2 border border-black h-10"
                />
              </div>
              <div className="sm:flex p-4 gap-2">
                <label htmlFor="username">
                  <h4>username</h4>
                </label>
                <input
                  type="text"
                  value={username}
                  autoComplete="on"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  required
                  className=" w-[330px] mt-2 rounded pl-2 px-2 py-2 border border-black h-10"
                />
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="align-middle border border-amber-950 w-[6rem] rounded justify-center ml-[32%]"
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
              </div>

              <p className="p-2 text-red-700">{message}</p>
            </section>
          </div>
        </div>
      </div>
      <div className="mt-[6rem]">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
