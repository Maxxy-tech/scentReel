import { useState } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import eye from "../../assets/icons8-eye-50.png";
import eye2 from "../../assets/icons8-hide-password-30.png";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import vector1 from "../../assets/Vector 1 (3).png"; // Assuming the path to vector1 image
import divImg from "../../assets/smile.png"; // Assuming the path to divImg image
import "./styly.css";

const Reset = () => {
  const axiosInstance = useAxiosInstance();
  const [newPassword, setNewpassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmNewpassword, setConfirmNewpassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!PWD_REGEX.test(newPassword) || newPassword !== confirmNewpassword) {
      setMessage("Passwords do not match or do not meet criteria");
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    const url = "auth/password";
    const payload = { oldPassword, newPassword, confirmNewpassword };

    try {
      const response = await axiosInstance.patch(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setMessage(response.data.message);
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
            <img src={vector1} className="w-[400px] h-[500px]" alt="Vector" />
            <img
              src={divImg}
              className="absolute w-[300px] left-[106px] mb-[190px] h-[500px]"
              alt="Gentleman"
            />
          </div>
          <div className="bg-white w-full md:w-1/2 lg:w-2/3 p-6 md:p-8 lg:p-10 border border-[#608A7D] rounded-2xl">
            <h1 className="text-center text-2xl font-bold mt-6 mb-4">
              Reset Password
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col relative">
                <label
                  htmlFor="oldPassword"
                  className="text-left font-medium mb-2"
                >
                  Old Password
                </label>
                <input
                  type={showOldPassword ? "text" : "password"}
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-[#608A7D] rounded"
                />
                <img
                  src={showOldPassword ? eye : eye2}
                  alt="toggle visibility"
                  className="absolute top-2/4 w-6 right-3 mt-[20px] transform -translate-y-2/4 cursor-pointer"
                  onClick={() => setShowOldPassword((prev) => !prev)}
                />
              </div>
              <div className="flex flex-col relative">
                <label
                  htmlFor="newPassword"
                  className="text-left font-medium mb-2"
                >
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewpassword(e.target.value)}
                  required
                  className="w-full p-3 border border-[#608A7D] rounded"
                />
                <img
                  src={showPassword ? eye : eye2}
                  alt="toggle visibility"
                  className="absolute top-2/4 right-3 w-6 mt-[20px] transform -translate-y-2/4 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
              <div className="flex flex-col relative">
                <label
                  htmlFor="confirmNewpassword"
                  className="text-left font-medium mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmNewpassword"
                  value={confirmNewpassword}
                  onChange={(e) => setConfirmNewpassword(e.target.value)}
                  required
                  className="w-full p-3 border border-[#608A7D] rounded"
                />
                <img
                  src={showConfirmPassword ? eye : eye2}
                  alt="toggle visibility"
                  className="absolute top-2/4 w-6 mt-[20px] right-3 transform -translate-y-2/4 cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#608A7D] text-white py-3 px-6 rounded capitalize"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reset;
