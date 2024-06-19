import { useState } from "react";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import linkedin from "../../assets/linkedin.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-[#030101]  backdrop-blur-3xl box-content relative text-white  top-2  sm:m-3 sm:max-w-[100vw] shadow-2xl  z-50">
      {/* Logo and Navbar */}
      <div className="flex justify-between  items-center sm:ml-0 ml-4  sm:p-0 p-4 ">
        <div className="uppercase font-serif flex">
          <span className="font-extrabold text-[1.5rem] sm:text-[2rem]">
            scent
          </span>
          <span className="font-extrabold text-[1.5rem] text-[#ce974f] sm:text-[2rem] ml-1">
            reel
          </span>
        </div>
        <div className="sm:hidden px-6 ">
          <button onClick={toggleMenu} className="text-3xl">
            &#9776;
          </button>
        </div>
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } sm:flex sm:items-center sm:static absolute text-center ease-linear  top-[3rem] left-0 w-full sm:w-auto backdrop-blur-2xl bg-[#0a0909d0] cursor-pointer sm:bg-transparent min-h-[40vh] sm:min-h-0 transition-transform`}
          aria-label="main"
        >
          <ul className="sm:flex sm:p-2 sm:mr-10 sm:space-x-8 sm:mt-0 p-8 uppercase font-semibold sm:ml-auto">
            <li className="p-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `" p-4 hover:bg-[#222727c0] ${
                    isActive ? "text-[#f1ab4f]" : "text-[#fff]"
                  } rounded-lg hover:animate-pulse  "`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="p-2">
              <NavLink
                to="/brand"
                className={({ isActive }) =>
                  `" p-4 hover:bg-[#2227275d] ${
                    isActive ? "text-[#f1ab4f]" : "text-[#fff]"
                  } rounded-lg hover:animate-pulse  "`
                }
              >
                brand
              </NavLink>
            </li>
            <li className="p-2">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `" p-4 hover:bg-[#2227275d] ${
                    isActive ? "text-[#f1ab4f]" : "text-[#fff]"
                  } rounded-lg hover:animate-pulse  "`
                }
              >
                about
              </NavLink>
            </li>
            <li className="p-2">
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `" p-4 hover:bg-[#2227275d] ${
                    isActive ? "text-[#f1ab4f]" : "text-[#fff]"
                  } rounded-lg hover:animate-pulse  "`
                }
              >
                blog
              </NavLink>
            </li>
            <li className="p-2">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `" p-4 hover:bg-[#2227275d] ${
                    isActive ? "text-[#f1ab4f]" : "text-[#fff]"
                  } rounded-lg hover:animate-pulse  "`
                }
              >
                contact
              </NavLink>
            </li>
            <li className="p-2">
              <NavLink
                to="/forum"
                className={({ isActive }) =>
                  `" p-4 hover:bg-[#2227275d] ${
                    isActive ? "text-[#f1ab4f]" : "text-[#fff]"
                  } rounded-lg hover:animate-pulse  "`
                }
              >
                forum
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Divider */}
      <div>
        <hr />
      </div>

      {/* Social and Action Buttons */}
      <div className="bg-[#ffffff1f] ml-0">
        <div className="p-4 flex justify-between gap-8 box-content sm:justify-between items-center">
          <ul className="flex ml-0 justify-evenly gap-1 sm:gap-5">
            <li className="h-6 w-6 shadow-2xl shadow-black md:w-[40px] md:h-[40px] bg-[#C19E70] rounded-full flex items-center justify-center">
              <img
                src={facebook}
                alt="Facebook"
                className="h-full w-full object-cover"
              />
            </li>
            <li className="h-6 w-6 shadow-2xl shadow-black md:w-[40px] md:h-[40px] bg-[#C19E70] rounded-full flex items-center justify-center">
              <img
                src={instagram}
                alt="Instagram"
                className="h-full w-full object-cover"
              />
            </li>
            <li className="h-6 w-6 shadow-2xl shadow-black md:w-[40px] md:h-[40px] bg-[#C19E70] rounded-full flex items-center justify-center">
              <img
                src={twitter}
                alt="Twitter"
                className="h-full w-full object-cover"
              />
            </li>
            <li className="h-6 w-6 shadow-2xl shadow-black md:w-[40px] md:h-[40px] bg-[#C19E70] rounded-full flex items-center justify-center">
              <img
                src={linkedin}
                alt="LinkedIn"
                className="h-full w-full object-cover"
              />
            </li>
          </ul>
          <div className="flex justify-evenly box-border sm:mr-8 gap-2 sm:gap-10">

         <button className="bg-black text-xs sm:text-sm uppercase w-20 sm:w-24  h-8 sm:h-10 font-serif text-[#f0a645] hover:translate-y-1 hover:text-[#f1a31221] transition-all">
            <NavLink
            to ="/login"
            >


              Login
             </NavLink></button>
            <button className="bg-white text-xs sm:text-sm uppercase w-20 sm:w-24  h-8 sm:h-10 font-semibold font-serif text-[#000000] hover:translate-y-1 hover:text-[#f1a31221] transition-all">
              <NavLink to="/signup">
              Signup</NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
