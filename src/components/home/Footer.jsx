import facebook from "../../assets/tabler-icon-brand-facebook.png";
import twitter from "../../assets/tabler-icon-brand-x.png";
import instagram from "../../assets/tabler-icon-brand-instagram.png";
import linkedin from "../../assets/tabler-icon-brand-linkedin.png";
import { useState } from "react";
import axios from "axios";

const Footer = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = { fullName, email };

    try {
      const response = await axios.post(
        "https://scentreel-be.onrender.com/api/v1/subscribers",
        JSON.stringify(payload),
        { headers: { "Content-Type": "application/json" } }
      );
      setIsLoading(false);
      setMessage(response.data.message);
    } catch (error) {
      setIsLoading(false);
      setMessage(
        error.response && error.response.data
          ? `Registration Failed: ${error.response.data.message}`
          : `Registration Failed: ${error.message}`
      );
    }
  };

  return (
    <div className="w-full mt-20 bg-[#C19E70]">
      <div className="relative w-full">
        <div className="w-11/12 mx-auto flex flex-col sm:flex-row ml-5  sm:ml-10 md:ml-10 justify-between bg-[#608A7D] box-border absolute md:-top-16 -top-32 rounded-lg border-2 shadow-2xl shadow-black border-[#C19E70] sm:h-36">
          <div className="flex gap-6 md:gap-6  sm:gap-32 mt-3 sm:mt-10 mb-10 pb-1 sm:flex-row flex-col items-center">
            <div className="flex gap-2 sm:gap-6 p-4 md:p-2 sm:ml-12">
              <div className="w-8 h-8 sm:w-6 sm:h-6 bg-[#C19E70] rounded-full flex items-center justify-center">
                <img
                  src={facebook}
                  alt="Facebook"
                  className="w-6 h-6 sm:w-5 sm:h-5"
                />
              </div>
              <div className="w-8 h-8 sm:w-6 sm:h-6 bg-[#C19E70] rounded-full flex items-center justify-center">
                <img
                  src={instagram}
                  alt="Instagram"
                  className="w-6 h-6 sm:w-5 sm:h-5"
                />
              </div>
              <div className="w-8 h-8 sm:w-6 sm:h-6 bg-[#C19E70] rounded-full flex items-center justify-center">
                <img
                  src={twitter}
                  alt="Twitter"
                  className="w-6 h-6 sm:w-5 sm:h-5"
                />
              </div>
              <div className="w-8 h-8 sm:w-6 sm:h-6 bg-[#C19E70] rounded-full flex items-center justify-center">
                <img
                  src={linkedin}
                  alt="LinkedIn"
                  className="w-6 h-6 sm:w-5 sm:h-5"
                />
              </div>
            </div>

            <h1 className="sm:w-50 w-28 mt-4 text-2xl flex sm:h-14 text-white font-extrabold sm:text-4xl md:ml-1 sm:ml-10 uppercase">
              <span className="text-black font-extrabold">scent</span>
              <span className="text-[#C19E70]">Reel</span>
            </h1>
          </div>

          <div className="flex gap-6 ml-10  md:ml-4 sm:gap-10 sm:mr-10 p-8">
            <button className="bg-[#C19E70] w-24 md:ml-4 h-10 sm:w-20 sm:h-10 text-white uppercase cursor-pointer hover:bg-black">
              login
            </button>
            <button className="w-24 h-10 sm:w-20 sm:h-10 uppercase gap-2 hover:bg-[#1a1313a4] bg-[#608A7D] border">
              signup
            </button>
          </div>
        </div>
      </div>

      <div className="md:pt-4 pt-10 sm:pt-52">
        <div className="text-center">
          <h1 className="font-bold text-xl mt-[150px] m-4 font-serif p-4">
            SUBSCRIBE TO OUR NEWSLETTER
          </h1>
        </div>
        <div className="bg-[#d9d9d950] mt-[0px] w-11/12 md:w-3/4 lg:w-1/2 mx-auto  rounded-lg">
          <form onSubmit={handleSubmit} className="p-10 h-auto">
            <label htmlFor="username1" className="block text-center">
              FullName
              <input
                type="text"
                id="username1"
                className="border-2 bg-transparent md:ml-2 mt-2 mb-4 p-2 w-full md:w-2/3 lg:w-3/4"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
            </label>
            <label htmlFor="username2" className="block text-center ml-4 ">
              Email
              <input
                type="text"
                id="username2"
                className="border-2 bg-transparent md:ml-4 mt-2 mb-4 p-2 w-full md:w-2/3 lg:w-3/4"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

            </label><button
                type="submit"
                disabled={isLoading}
                className="capitalise text-[20px] w-[100px] ml-[90px] md:w-auto md:ml-[40%] lg:w-auto md:mt-[18px] lg:ml-4 p-2 bg-[#608A7D]  rounded-xl text-white"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
          </form>
          {message && (
            <p
              className={`text-center p-8 mt-[-30px] ${
                message.includes("success") ? "text-green-700" : "text-red-700"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
      <p className="block text-center mt-4">© 2024</p>
    </div>
  );
};

export default Footer;
