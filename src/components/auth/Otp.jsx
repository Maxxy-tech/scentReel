import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import useAxiosInstance from "../../hooks/useAxiosInstance";

const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isValidInput, setIsValidInput] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [time, setTime] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const OTP_REGEX = /^[0-9]$/;

  const refs = useRef([]);
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else {
        setIsExpired(true);
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);

  useEffect(() => {
    setIsValidInput(otp.every((num) => OTP_REGEX.test(num)));
  }, [otp]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (OTP_REGEX.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        refs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        refs.current[index - 1]?.focus();
      }
    }
  };

  const payload = { otp: otp.join("") };
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axiosInstance.post(
        "https://scentreel-be.onrender.com/api/v1/auth/verify",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("OTP verified successfully");
    } catch (error) {
      console.error(
        "Verification error:",
        error.response?.data?.message || error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosInstance.post(
        "https://scentreel-be.onrender.com/api/v1/admins/resend-otp",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTime(120);
      setIsExpired(false);
      console.log("OTP resent successfully");
    } catch (error) {
      console.error(
        "Resend OTP error:",
        error.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 w-full bg-gray-100 p-4 rounded-lg shadow-lg">
      <h4 className="text-center text-lg font-semibold mb-6">
        Enter the OTP sent to your email
      </h4>

      <div className="flex justify-center gap-2 mb-4">
        {otp.map((num, index) => (
          <input
            key={index}
            type="text"
            value={num}
            autoComplete="off"
            onChange={(e) => handleChange(e, index)}
            className={`w-12 h-12 sm:w-16 sm:h-16 text-center rounded-lg shadow-md font-bold text-lg ${
              OTP_REGEX.test(num) ? "border-green-500" : "border-red-500"
            }`}
            maxLength="1"
            ref={(el) => (refs.current[index] = el)}
            aria-label={`OTP input ${index + 1}`}
          />
        ))}
      </div>

      <div className="text-center mb-4">
        {isExpired ? (
          <p className="text-red-600 font-semibold">
            Token has expired
            <button
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleResendOtp}
              disabled={isLoading}
            >
              {isLoading ? <Spinner className="h-6 w-6" /> : "Resend Code"}
            </button>
          </p>
        ) : (
          <p className="text-gray-700">
            OTP expires in{" "}
            <span className="font-bold">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </p>
        )}
      </div>

      <div className="text-center">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
          onClick={handleSubmit}
          disabled={!isValidInput || isExpired || isSubmitting}
        >
          {isSubmitting ? <Spinner className="h-6 w-6" /> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Otp;
