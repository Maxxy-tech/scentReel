import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import google from "../../assets/icons8-google-48.png";
import facebook from "../../assets/tabler-icon-brand-facebook.png";
import "./register.css";
import Navbar from "../home/Navbar";
import Footer from "../../components/home/Footer";
import Otp from "./Otp";
import "../../index.css";
import divImg from "../../assets/Gentleman.png";
import vector1 from "../../assets/Vector 1 (3).png";
import useAuth from "../../hooks/useAuth";
import { UserContext } from "../../context/userContext";
import { useAuthContext } from "../../context/useAuthContext";
import AuthContext from "../../context/Authprovider";

const Login = () => {
  // State declaration
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { dispatch } = useAuthContext();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const url = "https://scentreel-be.onrender.com/api/v1/auth/login";
    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = response.data.data.user;
      setIsLoading(false);
      // const accessToken = response?.data?.accessToken;
      dispatch({ type: "LOGIN", payload: user });
      const roles = response?.data?.user?.role;
      setAuth({ email, password, roles });
      console.log(user);
      response.status == 200 ? setIsLogin(true) : setIsLogin(false);
      // Messages
      console.log(response.data.message);
      setMessage(response.data.message);
      // localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
    } catch (error) {
      console.error(
        error.response ? error.response.data.message : error.message
      );
      setIsLoading(false);
      setMessage(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  {
    isLogin ? <Navigate to="/home" /> : <Navigate to="/login" />;
  }

  return (
    <div className="bg-[#608A7D] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl mt-10 md:mt-0">
          <div className="hidden md:flex flex-col items-center md:w-1/2 lg:w-1/3">
            <img src={vector1} className="w-full max-w-sm" alt="Vector" />
            <img
              src={divImg}
              className="absolute h-full max-w-sm"
              alt="Gentleman"
            />
          </div>
          <div className="bg-white w-full md:w-1/2 lg:w-2/3 p-6 md:p-8 lg:p-10 border border-[#608A7D] rounded-2xl">
            <h1 className="text-center text-2xl font-bold uppercase mb-6">
              Login
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-left font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-[#608A7D] rounded"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-left font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-[#608A7D] rounded"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#608A7D] text-white py-3 px-6 rounded uppercase"
                >
                  Sign in
                </button>
              </div>
              <p className="text-red-700 text-center mt-2">{message}</p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
