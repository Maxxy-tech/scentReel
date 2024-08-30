import { useState, useRef, useEffect } from "react";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import { Spinner } from "@material-tailwind/react";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isValidInput, setIsValidInput] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [time, setTime] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const OTP_REGEX = /^[0-9]{1}$/;
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
  }, [otp,OTP_REGEX]);

  useEffect(() => {
    if (errorMessage) {
      // Auto-focus the first input field on error message update
      refs.current[0]?.focus();
    }
  }, [errorMessage]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (OTP_REGEX.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        refs.current[index + 1]?.focus();
      } else if (index === otp.length - 1 && isValidInput) {
        handleSubmit();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      refs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < otp.length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const payload = {
    otp: otp.join(""),
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!isValidInput || isLoading) return;
    setIsLoading(true);
    setErrorMessage(""); // Clear previous error message
    try {
      const response = await axiosInstance.post(
        "api/v1/admins/verify",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Payload sent", payload);
      console.log(response.data);
      // Optionally redirect or show success message here
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setErrorMessage(""); // Clear previous error message
    try {
      const response = await axiosInstance.post(
        "auth/resend-otp",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Resend payload sent", payload);
      console.log(response.data);
      setTime(120);
      setIsExpired(false);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="flex flex-col items-center mt-6 w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h4 className="text-lg font-semibold text-gray-700 mb-4">Enter OTP</h4>
      <p className="text-gray-500 mb-6">Enter the OTP sent to your email</p>

      <div className="flex justify-center gap-2 mb-4">
        {otp.map((num, index) => (
          <input
            key={index}
            type="text"
            value={num}
            autoComplete="off"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-label={`OTP digit ${index + 1}`}
            className={`w-12 h-12 sm:w-16 sm:h-16 rounded text-center text-xl font-semibold border-2 ${
              num
                ? OTP_REGEX.test(num)
                  ? "border-green-500"
                  : "border-red-500"
                : "border-gray-300"
            } focus:outline-none focus:border-blue-500 transition-colors`}
            maxLength="1"
            ref={(el) => (refs.current[index] = el)}
          />
        ))}
      </div>

      {errorMessage && (
        <div role="alert" className="text-red-600 mb-4" aria-live="assertive">
          {errorMessage}
        </div>
      )}

      <div className="text-center text-red-600 mb-6">
        {isExpired ? (
          <p>
            Token has expired.
            <button
              className="ml-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow-lg hover:bg-blue-700 transition"
              onClick={handleResendOtp}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner color="white" className="h-6 w-6" />
              ) : (
                "Resend Code"
              )}
            </button>
          </p>
        ) : (
          <p className="text-gray-700">
            OTP expires in{" "}
            <span className="font-bold text-xl">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </p>
        )}
      </div>

      <button
        className={`px-6 py-2 text-white font-bold rounded shadow-lg transition ${
          isValidInput && !isExpired && !isLoading
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleSubmit}
        disabled={!isValidInput || isExpired || isLoading}
      >
        {isLoading ? <div>submitting...</div> : "Submit"}
      </button>
    </div>
  );
};

export default Otp;
