import Socials from "../Socials";
import Navbar from "../home/Navbar";
import { useState } from "react";
import divImg from "../../assets/Lady2.jpeg";
import vector1 from "../../assets/Vector 1 (3).png";
import Footer from "../../components/home/Footer";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import "./contact.css";

const Brand = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const axiosInstance = useAxiosInstance();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await axiosInstance.post("/api/v1/users/contact-us", {
        fullName,
        email,
        message,
      });
      alert("Message sent successfully!");
      setFullName("");
      setEmail("");
      setMessage("");
      setIsLoading(false)
    } catch (error) {
      console.error(error);
      alert("Error sending message, please try again.");
    }
  };

  return (
    <div className="bg-[#608A7D] box-content sm:w-auto h-full">
      <Navbar />

      <div className="md:flex sm:p-1 sm:relative sm:m-[60px] sm:justify-between">
        <div className="sm:flex w-1/3">
          <div className="sm:flex rounded-full sm:relative sm:w-[600px] sm:h-[350px] hidden sm:mt-[10px]">
            <img
              src={vector1}
              className="ml-[15%] w-[500px] h-[500px]"
              alt=""
            />
            <img
              src={divImg}
              className="absolute p-4 sm:h-[490px] sm:w-[370px] ml-[20%] mb-[22px] bg-transparent rounded-full"
              alt=""
            />
          </div>
        </div>

        <div className="bg-white box-content text-center sm:w-2/3 w-full sm:h-auto h-auto border-[1px] border-[#608A7D] rounded-[20px] p-6">
          <h1 className="text-center w-full uppercase font-bold font-serif text-2xl mt-6">
            Contact Us
            <hr className="mt-2" />
          </h1>

          <div className="mt-6 ml-[50%]">
            <Socials />
          </div>

          <form onSubmit={handleSubmit} className="w-full px-4 mt-8">
            <div className="mb-6">
              <label htmlFor="fullName" className=" font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className=""
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className=""
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="w-full">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full sm:w-[80%] p-3 mt-2 border border-[#608A7D] rounded"
                placeholder="Drop your complaint here"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#608A7D] text-white py-3 px-6 rounded capitalize flex items-center justify-center"
            >
              {isLoading && (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-[40%]">
        <Footer />
      </div>
    </div>
  );
};

export default Brand;
