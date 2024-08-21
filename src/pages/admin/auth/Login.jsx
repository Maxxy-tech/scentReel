import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./register.css";
import Navbar from "../home/Navbar";
import Footer from "../../components/home/Footer";
import "../../index.css";
import divImg from "../../assets/Gentleman.png";
import vector1 from "../../assets/Vector 1 (3).png";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import AuthContext from "../../context/Authprovider";
import { UserContext } from "../../context/userContext";
import eye from "../../../assets/icons8-eye-50.png";
import eye2 from "../../../assets/icons8-hide-password-30.png";

const Login = () => {
  const axiosInstance = useAxiosInstance();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const { auth, setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Login, setIsLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  useEffect(() => {
    if (Login) {
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
      });

      const user = response?.data.data.user;
      const roles = response?.data.data.user.role;
      const accessToken = response?.data.data.accessToken;

      navigate(from, { replace: true });
      setIsLoading(false);
      setAuth({ email, roles, accessToken });

      setMessage(response.data.message);
      setUser(user);
      setIsLogin(true);
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
          <div className="hidden md:flex md:w-1/2 lg:w-1/3">
            <img
              src={vector1}
              className="w-[400px] left-1 h-[500px]"
              alt="Vector"
            />
            <img
              src={divImg}
              className="absolute w-[300px] left-[106px] mb-[190px] h-[500px]"
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
              <div className="flex flex-col relative">
                <label
                  htmlFor="password"
                  className="text-left font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-[#608A7D] rounded pr-12" // Add padding-right for the eye icon
                />
                <img
                  src={showPassword ? eye : eye2}
                  alt="Toggle password visibility"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
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
