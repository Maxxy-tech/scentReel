import { useState, useEffect, useRef } from "react";
import axios from "axios";
import icon1 from "../../assets/icons8-approved-30.png";
import icon2 from "../../assets/icons8-cancel-50.png";
import icon3 from "../../assets/icons8-info-50.png";
import eye from "../../assets/icons8-eye-50.png";
import eye2 from "../../assets/icons8-hide-password-30.png";
import Navbar from "../home/Navbar";
import img from "../../assets/kisspng-perfume-coco-mademoiselle-chanel-no-5-coco-chanel-5b48a768396c22.6893536415314881042352.png";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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

  useEffect(() => {
    userRef.current.focus();
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
    e.preventDefault();

    if (!validName || !validPassword || !validMatch) {
      setErrMsg("Invalid Entry");
      return;
    }

    const payload = {
      fullName: fullName,
      email: email,
      username: username,
      password: password,
    };
    console.log("Payload being sent:", payload); // Debugging log

    try {
      const response = await axios.post(
        "https://scentreel-be.onrender.com/api/v1/auth/register ",
        JSON.stringify(payload),
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Response from server:", response); // Debugging log

      setSuccess(true);
      setMessage("Registration Successful");
    } catch (error) {
      console.error(
        "Error response from server:",
        error.response ? error.response.data : error.message
      ); // Debugging log
      if (error.response && error.response.data) {
        setMessage(`Registration Failed: ${error.response.data.message}`);
      } else if (error.request) {
        setMessage("Registration Failed: No response from server");
      } else {
        setMessage(`Registration Failed: ${error.message}`);
      }
      // For screen readers
      errRef.current.focus();
    }
  };

  return (
    <div className="w-full overflow-hidden bg-[#1a221f]">
      <Navbar />
      <div className="sm:w-full pr-5 sm:h-full sm:p-5">
        <h2 className="text-3xl capitalize sm:p-4 p-1 text-center text-white font-bold mb-4">
          Want to become a member?
          <hr />
        </h2>
        <div className="w-full">
          <p
            ref={errRef}
            className={errMsg ? "visible" : "hidden"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="sm:p-10 sm:flex sm:gap-10 sm:w-full">
            <div className="sm:mt-12 sm:pl-2 sm:px-[4rem]">
              <div className="bg-gradient-to-l from-[hsl(131,57%,16%)] to-transparent left-1 rounded-full sm:absolute sm:z-10 sm:w-[400px] sm:h-[600px]">
                <img src={img} className=" mt-24 ml-24 h-" alt="" />
              </div>
            </div>
            <div className="w-full sm:pl-8">
              <div className="rounded-3xl sm:w-auto justify-between sm:p-4 sm:mt-40 sm:my-2 sm:ml-10 shadow-black shadow-2xl">
                <div className="mt-10 w-full sm:px-20 self-center ml-10 sm:ml-20">
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white sm:p-6 rounded-3xl shadow-md shadow-white w-80 sm:w-full h-full"
                  >
                    <h2 className="text-2xl capitalize text-center font-bold mb-4">
                      <br />
                      <span>Sign up</span>
                    </h2>
                    <div className="py-2 my-2">
                      <div className="mb-4">
                        <label
                          htmlFor="fullName"
                          className="block ml-3 text-gray-700"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={fullName}
                          onChange={(e) => setFullname(e.target.value)}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                      <div className="mb-4 w-full">
                        <label
                          htmlFor="username"
                          className="flex ml-3 p-2 text-gray-700"
                        >
                          <span className="p-1 capitalize">Username</span>
                          <span className={validName ? "valid" : "hidden"}>
                            <img
                              src={icon1}
                              width="25px"
                              className="ml-auto"
                              alt="valid"
                            />
                          </span>
                          <span
                            className={
                              validName || !username ? "hidden" : "visible"
                            }
                          >
                            <img
                              src={icon2}
                              width="16px"
                              className="ml-auto"
                              alt="invalid"
                            />
                          </span>
                        </label>
                        <input
                          type="text"
                          id="username"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full px-3 py-2 border rounded"
                          required
                          aria-invalid={validName ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setUserFocus(true)}
                          onBlur={() => setUserFocus(false)}
                        />
                        <p
                          id="uidnote"
                          className={
                            userFocus && username && !validName
                              ? "visible"
                              : "hidden"
                          }
                        >
                          <div className="flex gap-2 w-full p-2 m-2 rounded-3xl text-light bg-black text-white">
                            <img src={icon3} width="24px" alt="" />
                            <div>
                              4 to 24 characters.
                              <br />
                              Must begin with a letter.
                              <br />
                              Letters, numbers, underscores, hyphens allowed.
                            </div>
                          </div>
                        </p>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="block ml-3 text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="password"
                          className="block ml-3 text-gray-700"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={revealPwd ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                          />
                          <button
                            type="button"
                            onClick={() => setRevealPwd(!revealPwd)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                          >
                            {revealPwd ? (
                              <img src={eye} width="20px" alt="Hide password" />
                            ) : (
                              <img
                                src={eye2}
                                width="20px"
                                alt="Show password"
                              />
                            )}
                          </button>
                        </div>
                        <p
                          id="pwdnote"
                          className={
                            passwordFocus && !validPassword
                              ? "visible"
                              : "hidden"
                          }
                        >
                          <div className="flex gap-2 w-full p-2 m-2 rounded-3xl text-light bg-black text-white">
                            <img src={icon3} width="24px" alt="" />
                            <div>
                              8 to 24 characters.
                              <br />
                              Must include uppercase and lowercase letters, a
                              number and a special character.
                              <br />
                              Allowed special characters:{" "}
                              <span aria-label="exclamation mark">!</span>{" "}
                              <span aria-label="at symbol">@</span>{" "}
                              <span aria-label="hashtag">#</span>{" "}
                              <span aria-label="dollar sign">$</span>{" "}
                              <span aria-label="percent">%</span>
                            </div>
                          </div>
                        </p>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="confirmPassword"
                          className="block ml-3 text-gray-700"
                        >
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={revealConfirmPwd ? "text" : "password"}
                            id="confirmPassword"
                            value={matchPassword}
                            onChange={(e) => setMatchPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setRevealConfirmPwd(!revealConfirmPwd)
                            }
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                          >
                            {revealConfirmPwd ? (
                              <img src={eye} width="20px" alt="Hide password" />
                            ) : (
                              <img
                                src={eye2}
                                width="20px"
                                alt="Show password"
                              />
                            )}
                          </button>
                        </div>
                        <p
                          id="confirmnote"
                          className={
                            matchFocus && !validMatch ? "visible" : "hidden"
                          }
                        >
                          <div className="flex gap-2 w-full p-2 m-2 rounded-3xl text-light bg-black text-white">
                            <img src={icon3} width="24px" alt="" />
                            <div>
                              Must match the first password input field.
                            </div>
                          </div>
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#1a221f] text-white py-2 px-4 rounded hover:bg-[#2a3f2f]"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                  {message && (
                    <p
                      className="mt-4 text-center text-white"
                      role="alert"
                      aria-live="assertive"
                    >
                      {message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
