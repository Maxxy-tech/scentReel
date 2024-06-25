import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [validInput, setIsValidInput] = useState(false);
  const [popup, setPopup] = useState(false);
  const OTP_REGEX = /^[0-9]{1}$/;

  const refs = useRef([]);

  const verify = () => {
    // All inputs should be numeric and filled
    setIsValidInput(otp.every((num) => OTP_REGEX.test(num)));
  };

  useEffect(() => {
    verify();
  });

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (OTP_REGEX.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (value && index < otp.length - 1) {
        refs.current[index + 1].focus();
      }
    }
  };

  const payload = {
    otp: otp.join(""),
  };

  const handleSubmit = async (e) => {
    e.preventDefault;
    try {
      const response = await axios.post(
        "https://scentreel-be.onrender.com/api/v1/auth/register",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
     console.log(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="h-[20rem] w-full bg-whitesmoke">
      <div className="flex gap-4 w-full text-center sm:ml-[25%]  mt-">
        {otp.map((num, index) => (
          <div key={index} className="bg-white    rounded shadow-2xl shadow-black mt-[8rem] text-center  ">
            <input
              type="text"
              name={`otp-${index}`}
              value={num}
              autoComplete="off"
              onChange={(e) => handleChange(e, index)}
              className={`sm:w-[6rem] w-[3rem] h-[3rem] p-2 sm:h-[6rem] rounded text-center  font-semibold text-[1rem] ${
                validInput ? "border-green-500" : "border-red-500"
              }`}
              id={`otp-${index}`}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              ref={(el) => (refs.current[index] = el)}
            />
            <label className="" htmlFor={`otp-${index}`}></label>
          </div>
        ))}
      </div>
      {/* {validInput && <p>Valid OTP</p>}
      <pre>{JSON.stringify(payload, null, 2)}</pre> */}
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default Otp;
