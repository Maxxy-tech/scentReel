import { useState } from "react";
import axios from "axios";
import eye from "../../assets/icons8-eye-50.png";
import eye2 from "../../assets/icons8-hide-password-30.png";
import './styly.css'

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!PWD_REGEX.test(password) || password !== confirmPassword) {
      setMessage("Passwords do not match or do not meet criteria");
      setIsLoading(false);
      return;
    }

    const url = "https://scentreel-be.onrender.com/api/v1/auth/reset-password";
    const payload = { password, confirmPassword };

    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="fonty text-center text-2xl font-[600] text-[48px] h-[57.6px] text-[#1e1e1ef8] uppercase mb-6">
        Reset Password
      </h1>
      <div className="flex flex-col relative">
        <label htmlFor="password" className="text-left font-medium mb-2">
          New Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-[#608A7D] rounded"
        />
        <img
          src={showPassword ? eye2 : eye}
          alt="toggle visibility"
          className="absolute top-2/4 right-3 mt-[20px] transform -translate-y-2/4 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        />
      </div>
      <div className="flex flex-col relative">
        <label htmlFor="confirmPassword" className="text-left font-medium mb-2">
          Confirm Password
        </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-3 border border-[#608A7D] rounded"
        />
        <img
          src={showConfirmPassword ? eye2 : eye}
          alt="toggle visibility"
          className="absolute top-2/4 mt-[20px] right-3 transform -translate-y-2/4 cursor-pointer"
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
            message.includes("success") ? "text-green-700" : "text-red-700"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default Reset;
