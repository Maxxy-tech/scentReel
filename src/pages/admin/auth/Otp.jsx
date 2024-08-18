import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [validInput, setIsValidInput] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [Time, setTime] = useState(120);
  const [IntervalId, setIntervalId] = useState(null);
  const [isLoading, setIsLoading]= useState(false)
  const OTP_REGEX = /^[0-9]{1}$/;

  const refs = useRef([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Time > 0) {
        setTime(Time - 1);
      } else if (Time == 0) {
        setIsExpired(true);
      }
    }, 1000);
    setIntervalId(intervalId);
    return () => clearInterval(intervalId);
  }, [Time]);

  const minutes = Math.floor(Time / 60);
  const seconds = Time % 60;

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
        refs.current[index + 1];
      }
    }
  };

  const payload = {
    otp: otp.join(""),
  };

  const token = localStorage.getItem("token");


  //APi request to verify token
  const handleSubmit = async (e) => {
    e.preventDefault;
    try {
      const response = await axios.post(
        "https://scentreel-be.onrender.com/api/v1/auth/verify",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("payload being sent", payload);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  //Api request to resend otp

     const ResendOtp = async (e) => {
       setIsLoading(true)
       e.preventDefault;

       try {
         const response = await axios.post(
           "https://scentreel-be.onrender.com/api/v1/admins/resend-otp",
           payload,
           {
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             },
           }
         ); setIsLoading(false)
         console.log("payload being sent", payload);
         console.log(response.data);

       } catch (error) {
         console.error(error.response.data.message);
       }
     };










   ////////////////////////////////////

  return (
    <div className=" mt-[4px] w-full bg-[#f1f1]  ">
      <h4 className="text1">
        Enter Otp sent to your email here
      </h4>

      <div className="full mt-10  mr-6 ">
        <div className="flex gap-2 lg:ml-[90px]  w-full sm:ml-[70px]  ml-5 text-center sm:w-[20px]  ">
          {otp.map((num, index) => (
            <div
              key={index}
              className="  mt-10   rounded shadow-xl shadow-white text-center  "
            >
              <input
                type="text"
                name={`otp-${index}`}
                value={num}
                autoComplete="off"
                onChange={(e) => handleChange(e, index)}
                className={`sm:w-[4rem] box w-[2rem] h-[3rem]  sm:h-[6rem] rounded text-center p-2 shadow-xl shadow-[#00000042] font-semibold text-[1rem] ${
                  validInput ? "border-green-500" : "border-red-500"
                }`}
                id={`otp-${index}`}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                ref={(e) => (refs.current[index] = e)}
              />
              <label className="" htmlFor={`otp-${index}`}></label>
            </div>
          ))}
        </div>
        <h5 className="text-red-600 mt-10 text-center capitalize font-thin tracking-wide w-full">
          {isExpired ? (
            <p className="">token has expired
             <button className="border-[1px] w-[100px] cursor-pointer  uppercase  m-2 bg-blue-900 mt-[20px] text-white" onClick= {ResendOtp} >{isLoading ? <Spinner
                        color="green"
                        className="small h-8 w-6 text-center ml-[35%]  text-white"
                      />:<p>resend code</p>} </button>  </p>
          ) : (
            <p >
          <span className="text-[22px] mr-2 small">otp   expires in</span>  <span className="text-[25px] font-extrabold small">{minutes}</span> <span className="font-bold text-[20px] m-0 ">:</span>{" "}
              <span className="text-[25px] font-extrabold">{seconds.toString().padStart(2, "0")}</span>
            </p>
          )}
        </h5>
      </div>
      {/* {validInput && <p>Valid OTP</p>}
      <pre>{JSON.stringify(payload, null, 2)}</pre> */}
      <button
        className="bg-[#0a6954f6] text-[#f7f6f6] font-bold h-[40px] rounded m-8 text-center ml-[110px] w-[90px] tracking-widest mt-[80px] uppercase text-[15px]"
        onClick={handleSubmit}
        disabled={isExpired}
      >
       {isLoading ? <Spinner
                        color="green"
                        className="h-8 w-6 text-center ml-[35%]  text-white" />: <p> submit </p>}
      </button>
    </div>
  );
};

export default Otp;
