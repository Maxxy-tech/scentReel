import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


import Navbar from "../home/Navbar";
import Footer from "../../components/home/Footer";
import "./styly.css";
import "../../index.css";
import Reset from "./Reset";
import divImg from "../../assets/Gentleman.png";
import vector1 from "../../assets/Vector 1 (3).png";
// import useAuth from "../../hooks/useAuth";
import { UserContext } from "../../context/userContext";
import { useAuthContext } from "../../context/useAuthContext";
import AuthContext from "../../context/Authprovider";

const ForgotPwd = () => {
  // State declaration
  const location = useLocation();
  const navigate = useNavigate();
  // const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const url = "https://scentreel-be.onrender.com/api/v1/auth/forgot-password";
    const payload = { email };

    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });
      setIsLoading(false);
      setMessage(response.data.message);
      setSuccess(true);
    } catch (error) {
      setIsLoading(false);
      setMessage(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  return (
    <div className="bg-[#608A7D] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col mb-[100px] md:mt-[70px] justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl mt-10 md:mt-0">
          <div className="hidden md:flex flex-col items-center md:w-1/2 lg:w-1/3">
            <img src={vector1} className=" w-[400px] h-[500px]" alt="Vector" />
            <img
              src={divImg}
              className="absolute w-[300px] mb-[190px] h-[500px]"
              alt="Gentleman"
            />
          </div>
          <div className="bg-white w-full md:w-1/2 lg:w-2/3 p-6 md:p-8 lg:p-10 border border-[#608A7D] rounded-2xl">
            {success ? (
              <Reset />
            ) : (
              <div>
                <h1 className="fonty text-center text-2xl font-[600] text-[48px] h-[57.6px] text-[#1E1E1E] uppercase mb-6">
                  Password Reset
                </h1>
                <h4 className="fonty1 font-[400] text-[14px] text-[#1E1E1E] tracking-wide font-[poppins]">
                  Please enter your email to receive a verification code
                </h4>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="tag text-left mt-8 font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-3 border border-[#608A7D] rounded"
                    />
                  </div>
                  <div className="text-center flex justify-center gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="bg-[#608A7D] text-white py-3 px-6 rounded capitalize"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-[#608A7D] text-white py-3 px-6 rounded capitalize"
                    >
                      {isLoading ? "Requesting..." : "Continue"}
                    </button>
                  </div>
                  {message && (
                    <p
                      className={`text-center mt-2 ${
                        message.includes("success")
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {message}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPwd;
