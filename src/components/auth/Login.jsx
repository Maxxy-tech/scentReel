import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance"; // Import the axios instance with interceptors

import "./register.css";
import Navbar from "../home/Navbar";
import Footer from "../../components/home/Footer";
import "../../index.css";
import divImg from "../../assets/Gentleman.png";
import vector1 from "../../assets/Vector 1 (3).png";
import useAxiosInstance from '../../hooks/useAxiosInstance'
import AuthContext from "../../context/Authprovider"; //
import { UserContext } from "../../context/userContext";
// import { useAuthContext } from "../../context/useAuthContext";

const Login = () => {
  const axiosInstance=useAxiosInstance()
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {auth, setAuth } = useContext(AuthContext); // Use useContext to access AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Login, setIsLogin] = useState(false);
  const [message, setMessage] = useState("");
  // const { dispatch } = useAuthContext();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  useEffect(() => {
    if (Login ) {
      console.log("Navigating to home page");
      navigate("/", { state: { from: location }, replace: true });
    }
  }, [Login, location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const url = "auth/login";
    const payload = {
      email,
      password,
    };

    try {
      const response = await axiosInstance.post(url, payload, {
        headers: {
          "Content-Type": "application/json",

        },
        // withCredentials: true
      });

      console.log("Login response:", response, response.status);

      const user = response?.data.data.user;
      const roles = response?.data.data.user.role;
      const accessToken = response?.data.data.accessToken;

      navigate(from, {replace:true})
      setIsLoading(false);
      // dispatch({ type: "LOGIN", payload: user });
      setAuth({ email, roles, accessToken });

      setMessage(response.data.message);
      setUser(user); // Set the user context
      console.log(response.status, user);
      // Navigate to home page after successful login
      setIsLogin(true);
    } catch (error) {
      setIsLoading(false);
      console.log("Login error:", error);
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
          <div className="hidden md:hidden lg:flex sm:flex w-full sm:w-1/3 relative">
            <div className="relative w-full sm:w-[328.37px]   rounded-[380px] h-[511.12px] mt-10 ">
              <div className="w-[558.57px] ">
                {" "}
                <img
                  src={vector1}
                  className="absolute w-[458.57px] left-[15px] border-[5px] border-transparent h-[508px]"
                  alt=""
                />
              </div>
              <div className="h-[600.64px] top-[517px] w-[411.95px]  rounded-[300px]  rotate-[-1.61]">
                <img
                  src={divImg}
                  className="absolute h-[500.64px] left-8  top-[2px] w-[311.95px]  rounded-[300px] rotate-[178.39]"
                  alt=""
                />
              </div>
            </div>
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
                <p className="w-full text-end text-[#2819ad] capitalize mt-4 mr-8 cursor-pointer hover:text-[#2e0f0f42]">
                  <Link to="/forgot-pwd">Forgot password?</Link>
                </p>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#608A7D] text-white py-3 px-6 rounded capitalize"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </div>
              {message && (
                <p
                  className={`text-center mt-2 ${
                    message.includes("successful")
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer className="mt-[80px]" />
    </div>
  );
};

export default Login;
