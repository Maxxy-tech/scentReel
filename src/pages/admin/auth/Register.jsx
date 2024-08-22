import { useState, useEffect, useRef } from "react";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import googleIcon from "../../assets/icons8-google-48.png";
import facebookIcon from "../../assets/tabler-icon-brand-facebook.png";
import infoIcon from "../../assets/icons8-info-50.png";
import eyeOpenIcon from "../../assets/icons8-eye-50.png";
import eyeClosedIcon from "../../assets/icons8-hide-password-30.png";
import gentlemanImage from "../../assets/Gentleman.png";
import vectorImage from "../../assets/Vector 1 (3).png";
import "./register.css";
import Navbar from "../home/Navbar";
import Footer from "../../components/home/Footer";
import Otp from "./Otp";

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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
  <div className="p-3 relative">
    <label className="flex capitalize sm:p-3">
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
        <button
          type="button"
          onClick={toggleReveal}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
        >
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
        <p className={noteVisible ? "instructions" : "offscreen"}>
          <img src={infoIcon} alt="info icon" width="20px" />
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

  const [success, setSuccess] = useState(false);
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
    setValidName(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validName || !validPassword || !validMatch) {
      setErrMsg("Invalid Entry");
      setIsLoading(false);
      return;
    }

    const payload = {
      fullName,
      email,
      username,
      password,
    };

    try {
      const response = await axios.post(
        "https://scentreel-be.onrender.com/api/v1/auth/register",
        JSON.stringify(payload),
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response.data.data.accesstoken.token;
      localStorage.setItem("token", token);

      setIsLoading(false);
      setPopup(false);
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
    <div className="bg-[#608A7D] box-content w-full min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row p-4 sm:p-8 mt-6 justify-center items-center">
        <div className="hidden lg:flex w-full md:w-1/3 relative">
          <div className="relative w-full rounded-[380px] h-[611.12px] mt-10">
            <img
              src={vectorImage}
              className="absolute w-[458.57px] left-[-50px] border-[5px] border-transparent h-[608px]"
              alt=""
            />
            <img
              src={gentlemanImage}
              className="absolute h-[600.64px] left-[32px] top-[2px] w-[411.95px] bg-[#F5AFAF] rounded-[300px] rotate-[178.39]"
              alt=""
            />
          </div>
        </div>
        <div className="bg-white w-full md:w-1/3 p-8 border-[1px] border-[#608A7D] rounded-[20px]">
          {popup ? (
            <Otp />
          ) : (
            <div>
              <h1 className="text-center text-2xl font-bold mb-4">
                Become a Member
                <hr />
              </h1>
              <section className="flex flex-col p-8 sm:flex-row gap-4 sm:gap-8 mb-4">
                <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-[270px] border h-[40px] border-[#608A7d] rounded-[10px] bg-white">
                  <div className="bg-[#608A7d] h-full flex items-center">
                    <img
                      src={googleIcon}
                      className="h-full w-8 p-2"
                      alt="Google logo"
                    />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base">
                    Register with Google
                  </h4>
                </div>
                <div className="flex items-center gap-4 sm:gap-8 sm:w-[270px] border h-[40px] rounded-[10px] border-[#608A7D] bg-white">
                  <div className="bg-[#608A7d] h-full flex items-center">
                    <img
                      src={facebookIcon}
                      className="p-2 h-full"
                      alt="Facebook logo"
                    />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base">
                    Register with Facebook
                  </h4>
                </div>
              </section>
              <h3 className="text-center capitalize mb-4">or</h3>
              <section className="h-auto">
                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-[558px] md:w-[500px]"
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
                  icon={eyeOpenIcon}
                  toggleIcon={eyeClosedIcon}
                  toggleIconAlt="Toggle visibility"
                  reveal={revealPwd}
                  toggleReveal={() => setRevealPwd((prevState) => !prevState)}
                  note="Password must be 8-24 characters long, and include at least one uppercase letter, one lowercase letter, a number, and a special character."
                  noteVisible={passwordFocus && password && !validPassword}
                />
                <InputField
                  label="Confirm Password"
                  type="password"
                  value={matchPassword}
                  onChange={(e) => setMatchPassword(e.target.value)}
                  ariaInvalid={validMatch ? "false" : "true"}
                  ariaDescribedby="matchnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  icon={eyeOpenIcon}
                  toggleIcon={eyeClosedIcon}
                  toggleIconAlt="Toggle visibility"
                  reveal={revealConfirmPwd}
                  toggleReveal={() =>
                    setRevealConfirmPwd((prevState) => !prevState)
                  }
                  note="Passwords must match."
                  noteVisible={matchFocus && !validMatch}
                />
                <InputField
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  ariaInvalid={validName ? "false" : "true"}
                  ariaDescribedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  note="Username must be 4-24 characters long, start with a letter, and can contain letters, numbers, hyphens, and underscores."
                  noteVisible={userFocus && username && !validName}
                />
                <InputField
                  label="Fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullname(e.target.value)}
                />
                <p ref={errRef} className="text-red-500 mt-2">
                  {errMsg}
                </p>
                <div className="flex justify-center items-center mt-8">
                  {isLoading ? (
                    <Spinner className="h-12 w-12 text-black/10" />
                  ) : (
                    <button
                      type="button"
                      disabled={isButtonDisabled}
                      onClick={handleSubmit}
                      className={`w-full sm:w-2/3 md:w-1/2 py-2 bg-[#608A7d] text-white font-bold rounded-lg ${
                        isButtonDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : "opacity-100 hover:bg-[#4a6f64]"
                      }`}
                    >
                      {isLoading ? "Signing Up..." : "Sign Up"}
                    </button>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <span className="text-gray-500">
                    Already a member?{" "}
                    <a
                      href="#"
                      className="text-blue-500 hover:text-blue-700 underline"
                    >
                      Login
                    </a>
                  </span>
                </div>
              </section>
              <div className="mt-8 mb-4">
                <Footer />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
