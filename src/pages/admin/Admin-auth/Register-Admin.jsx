import { useState, useEffect, useRef } from "react";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import google from "../../../assets/icons8-google-48.png";
import facebook from "../../../assets/tabler-icon-brand-facebook.png";
import icon1 from "../../../assets/icons8-approved-30.png";
import icon2 from "../../../assets/icons8-cancel-50.png";
import icon3 from "../../../assets/icons8-info-50.png";
import eye from "../../../assets/icons8-eye-50.png";
import eye2 from "../../../assets/icons8-hide-password-30.png";
import divImg from "../../../assets/Gentleman.png";
import vector1 from "../../../assets/Vector 1 (3).png";
import Navbar from "../../../components/home/Navbar";
import Footer from "../../../components/home/Footer";
import Otp from "./Otp";
import { useAuthContext } from "../../../context/useAuthContext";


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  autoComplete = "on",
  required = true,
  className,
  ariaInvalid,
  ariaDescribedby,
  onFocus,
  onBlur,
  icon,
  toggleIcon,
  toggleIconAlt,
  reveal,
  toggleReveal,
  note,
  noteVisible,
}) => (
  <div className="   relative">
    <label className="flex w-full capitalize ">
      <h4>{label}</h4>
    </label>
    <div className="relative">
      <input
        type={reveal ? "text" : type}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
        required={required}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`w-full border p-2 border-black h-8 rounded ${className}`}
      />
      {icon && (
        <button type="button" onClick={toggleReveal} className="eye">
          <img
            src={reveal ? icon : toggleIcon}
            width="20px"
            alt={toggleIconAlt}
          />
        </button>
      )}
    </div>
    {note && (
      <div className="relative mt-2">
        <p className={noteVisible ? "visible" : "offscreen"}>
          <img src={icon3} alt="info icon" width="20px" />
          {note}
        </p>
      </div>
    )}
  </div>
);

const Signup = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [revealPwd, setRevealPwd] = useState(false);
  const [revealConfirmPwd, setRevealConfirmPwd] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullname] = useState("");
  const [matchPassword, setMatchPassword] = useState("");

  // const [success, setSuccess] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [validName, setValidName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPassword]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!validName || !validPassword || !validMatch) {
      setErrMsg("Invalid Entry");
      return;
    }

    const payload = {
      fullName,
      email,
      // password,
      username,
    };

    try {
      const response = await axios.post(
        "https://scentreel-be.onrender.com/api/v1/admins/register",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response.data.data.accesstoken.token;
      localStorage.setItem("token", token);

      setIsLoading(false);
      setPopup(true);
      setMessage(response.data.message);
    } catch (error) {
      setIsLoading(false);
      setMessage(
        error.response && error.response.data
          ? `Registration Failed: ${error.response.data.message}`
          : `Registration Failed: ${error.message}`
      );
      errRef.current.focus();
    }
  };

  const isButtonDisabled =
    !username ||
    !password ||
    !matchPassword ||
    !email ||
    !fullName ||
    !validName ||
    !validPassword ||
    !validMatch;

  return (
    <div className="bg-[#608A7D] box-content w-full min-h-screen ]">
      <Navbar />
      <div className="flex flex-col sm:flex-row p-4 sm:p-20  mt-[20px] justify-center items-center">
        <div className="hidden ml-[1] -right-[10%] md:hidden lg:flex sm:flex w-full sm:w-1/3 relative">
          <div className="relative w-full sm:w-[428.37px]   rounded-[380px] h-[611.12px] mt-10 ">
            <div className="w-[458.57px] ">
              {" "}
              <img
                src={vector1}
                className="absolute w-[358.57px] left-[-50px] border-[5px] border-transparent h-[408px]"
                alt=""
              />
            </div>
            <div className="h-[400.64px] top-[517px] w-[211.95px] bg-[#F5AFAF] rounded-[300px]  rotate-[-1.61]">
              <img
                src={divImg}
                className="absolute h-[400.64px] left-[32px] top-[2px] w-[211.95px] bg-[#F5AFAF] rounded-[300px] rotate-[178.39]"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="bg-white w-full md:w-full md:p-1 sm:w-2/3 p-4 sm:p-8 border-[1px] border-[#608A7D] rounded-[20px]">
          {popup ? (
            <Otp />
          ) : (
            <div>
              <h1 className="text-center text-2xl font-bold mt-6 mb-4">
                Register Admin <hr />
              </h1>
              <section className="flex flex-col p-8 sm:flex-row gap-4 sm:gap-8 mb-4">
                <div className="flex items-center gap-8 w-[270px] border h-[40px] border-[#608A7d] rounded-[10px] bg-white">
                  <div className="bg-[#608A7d] h-full">
                    <img
                      src={google}
                      className="h-full  w-8 p-2"
                      alt="Google logo"
                    />
                  </div>
                  <h4 className="font-bold">Register with Google</h4>
                </div>
                <div className="flex items-center  gap-9  w-[270px]  border h-[40px] rounded-[10px] border-[#608A7D]  bg-white">
                  <div className="bg-[#608A7d] h-full">
                    <img
                      src={facebook}
                      className=" p-2 h-full"
                      alt="Facebook logo"
                    />
                  </div>

                  <h4 className="font-bold">Register with Facebook</h4>
                </div>
              </section>
              <h3 className="text-center capitalize ">or</h3>
              <section className=" h-auto lg:ml-[90px] p-8">
                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-[558px] md:w-[500px]  border p-2  border-black h-8 rounded"
                />
                <InputField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  ariaInvalid={validPassword ? "false" : "true"}
                  ariaDescribedby="pwdnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  className="w-full sm:w-[558px] md:w-[500px]  border p-2 border-black h-8 rounded"
                  icon={eye}
                  toggleIcon={eye2}
                  toggleIconAlt="Show password"
                  reveal={revealPwd}
                  toggleReveal={() => setRevealPwd(!revealPwd)}
                  note=" Must include uppercase and lowercase letters, a
                              number and a special character."
                  noteVisible={passwordFocus && password && !validPassword}
                />{" "}
                <div>
                  <InputField
                    label="Confirm Password"
                    type="password"
                    value={matchPassword}
                    onChange={(e) => setMatchPassword(e.target.value)}
                    ariaInvalid={validMatch ? "false" : "true"}
                    ariaDescribedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    className="w-full sm:w-[558px] md:w-[500px] p-2  border  border-black h-8 rounded"
                    icon={eye}
                    toggleIcon={eye2}
                    toggleIconAlt="Show password"
                    reveal={revealConfirmPwd}
                    toggleReveal={() => setRevealConfirmPwd(!revealConfirmPwd)}
                    note="Must match the first password input field."
                    noteVisible={matchFocus && matchPassword && !validMatch}
                  />
                </div>
                <InputField
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full sm:w-[558px] md:w-[500px] border p-2  border-black h-8 rounded"
                />
                <InputField
                  label="Username"
                  ref={userRef}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  ariaInvalid={validName ? "false" : "true"}
                  ariaDescribedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  className="w-full sm:w-[558px] md:w-[500px] mb-4 border p-2 border-black h-8 rounded"
                  note="4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed."
                  noteVisible={userFocus && username && !validName}
                />
                <div className=" justify-center mb-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}
                    className={`rounded capitalize submit border p-2 bg-[#608A7D] text-white text-center ml-[5%] submit w-20 h-10 ${
                      isButtonDisabled
                        ? "opacity-50 not-submit cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isLoading ? (
                      <Spinner
                        color="green"
                        className="h-6 w-6 ml-[45%]  text-white"
                      />
                    ) : (
                      <h4>Sign up</h4>
                    )}
                  </button>
                  <p
                    ref={errRef}
                    className={errMsg ? "hidden" : "flex text-red-500 "}
                    aria-live="assertive"
                  >
                    <p className="text-center  w-full mt-6">
                      {errMsg} {message}
                    </p>
                  </p>
                  <div className="text-center md:mt-4 mt-0 md:mb-0 mb-[190px] ">
                    <h3>
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="text-[#3a059c] font-bold hover:bg-slate-900"
                      >
                        Login here
                      </a>
                    </h3>
                  </div>
                </div>
              </section>
            </div>
          )}{" "}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
