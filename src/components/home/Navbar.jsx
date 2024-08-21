import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import linkedin from "../../assets/linkedin.png";
import empty from "../../assets/Empty.png";
import { UserContext } from "../../context/userContext"; // For accessing user data
import  AuthContext  from "../../context/Authprovider"; // For accessing auth state

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(UserContext); // Accessing user from context
  const { auth } = useContext(AuthContext); // Accessing auth state from context

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-[#030101] backdrop-blur-3xl relative text-white top-2 lg:m-3 lg:max-w-[100vw] shadow-2xl z-50">
      {/* Logo and Navbar */}
      <div className="flex justify-between items-center lg:p-0 p-4 lg:ml-0 ml-4">
        <div className="uppercase font-serif flex">
          <span className="font-extrabold text-[1.5rem] lg:text-[2rem]">
            scent
          </span>
          <span className="font-extrabold text-[1.5rem] text-[#ce974f] lg:text-[2rem] ml-1">
            reel
          </span>
        </div>
        <div className="lg:hidden px-6">
          <button onClick={toggleMenu} className="text-3xl">
            &#9776;
          </button>
        </div>
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:static absolute text-center ease-linear top-[3rem] left-0 w-full lg:w-auto backdrop-blur-2xl bg-[#0a0909e3] cursor-pointer sm:bg-transparent min-h-[40vh] lg:min-h-0 transition-transform`}
          aria-label="main"
        >
          <ul className="lg:flex lg:p-2 lg:mr-10 lg:space-x-8 lg:mt-0 p-8 uppercase font-semibold sm:ml-auto">
            {["Home", "Brand", "About", "Blog", "Contact", "Forum"].map(
              (item, index) => (
                <li key={index} className="p-2">
                  <NavLink
                    to={`/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      `p-4 hover:bg-[#222727c0] ${
                        isActive ? "text-[#f1ab4f]" : "text-[#fff]"
                      } rounded-lg hover:animate-pulse`
                    }
                  >
                    {item}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>

      {/* Divider */}
      <div>
        <hr />
      </div>

      {/* Social and Action Buttons */}
      <div className="bg-[#ffffff1f]">
        <div className="p-4 flex justify-between items-center">
          <ul className="flex gap-1 sm:gap-5">
            {[facebook, instagram, twitter, linkedin].map((icon, index) => (
              <li
                key={index}
                className="h-6 w-6 md:w-10 md:h-10 bg-[#C19E70] rounded-full flex items-center justify-center shadow-2xl shadow-black"
              >
                <img
                  src={icon}
                  alt={icon.split("/").pop().split(".")[0]} // Extract the name from the file path
                  className="h-full w-full object-cover"
                />
              </li>
            ))}
          </ul>
          <div className="flex items-center">
            {auth?.isAuthenticated ? (
              <NavLink
                to="/user-dashboard"
                className={({ isActive }) =>
                  `p-4 hover:bg-[#222727c0] ${
                    isActive ? "text-[#f1ab4f]" : "text-[#fff]"
                  } rounded-lg hover:animate-pulse flex items-center`
                }
              >
                <img
                  src={user?.profileImageUrl || empty}
                  className="w-[40px] h-[40px] rounded-full"
                  alt={user?.username}
                />
                <h5 className="ml-2 text-[20px] capitalize">{user.username}</h5>
              </NavLink>
            ) : (
              <div className="flex gap-2 sm:gap-10">
                <NavLink to="/login">
                  <button className="bg-black text-xs sm:text-sm uppercase w-20 sm:w-24 h-8 sm:h-10 font-serif text-[#f0a645] hover:translate-y-1 hover:text-[#f1a31221] transition-all">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/signup">
                  <button className="bg-white text-xs sm:text-sm uppercase w-20 sm:w-24 h-8 sm:h-10 font-semibold font-serif text-black hover:translate-y-1 hover:text-[#f1a31221] transition-all">
                    Signup
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
