import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import vector1 from "../../assets/Vector 1 (3).png";
import divImg from "../../assets/Empty.png";
import { UserContext } from "../../context/userContext";
import { FaUpload } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import useAxiosInstance from "../../hooks/useAxiosInstance";

const UserDashboard = () => {
  const axiosInstance = useAxiosInstance();
  const { user } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
      setProfileImage(user.profileImageUrl || divImg);
    }
  }, [user]);

  const username = user?.username || "";
  const fullName = user?.fullName || "";
  const email = user?.email || "";

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const token = localStorage.getItem("token");

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const profileImage = new FormData();
    profileImage.append("profileImage", selectedFile);

    try {
      const response = await axiosInstance.put(
        "/users/upload-profile-image",
        profileImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfileImage(response.data.imageUrl);
      setPreview(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
    }
  };

  return (
    <div className="bg-[#608A7D] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col md:mt-[70px] justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl mt-10 md:mt-0">
          <div className="relative flex flex-col -mt-[500px] items-center md:w-1/2 lg:w-1/3">
            <img
              src={vector1}
              className="absolute w-[400px] h-[410px] hidden md:block"
              alt="Vector"
              style={{ top: "0", zIndex: "1" }}
            />
            <img
              src={profileImage || divImg}
              className="absolute w-[300px] h-[400px] left-[50px] top-[0] border-[10px] border-[rgba(94,168,145,0.53)] rounded-full"
              alt="Profile"
              style={{
                borderRadius: "300px",
                transform: "matrix(-1, 0.03, 0.03, 1, 0, 0)",
                zIndex: "2",
              }}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="absolute w-[300px] h-[400px] left-[50px] top-[0] border-[10px] border-[rgb(96,138,125)] rounded-full"
                style={{
                  borderRadius: "300px",
                  transform: "matrix(-1, 0.03, 0.03, 1, 0, 0)",
                  zIndex: "2",
                }}
              />
            )}
            <div className="top-[320px] z-[2] gap-4 bg-[#608a7daf] w-[150px] rounded-md absolute flex right-[50px]">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="inset-0 opacity-0 cursor-pointer"
              />
              <label
                htmlFor="file-upload"
                className="inset-0 flex items-center justify-center rounded-full opacity-70 hover:opacity-100 w-[100px] transition-opacity duration-300"
              >
                <RiImageAddFill className="text-white rounded-full md:w-[30px] md:h-[30px] text-3xl" />
              </label>
              <button
                onClick={handleFileUpload}
                className="right-4 hover:text-[#524e4e] text-white p-2 rounded-full items-center justify-center"
                aria-label="Upload Image"
              >
                <FaUpload className="w-10 rounded-full bg-[#2208086c]" />
                <small>Upload</small>
              </button>
            </div>
          </div>
          <div className="bg-white w-full p-10 mt-[20px] md:mt-0 md:w-1/2 lg:w-2/3 md:p-8 lg:p-10 border mb-[100px] border-[#608A7D] rounded-2xl">
            <h1 className="text-center text-2xl font-bold uppercase pb-0">
              {isLogin ? `Welcome, ${username}` : "Profile"}
            </h1>
            <div className="space-y-6 font-serif">
              <div className="md:flex p-4 w-full rounded-xl">
                <p className="text-[16px] mt-6">Name:</p>
                <h5 className="capitalize mt-8 text-center text-[20px] text-[#635c5c] w-full">
                  {fullName}
                </h5>
              </div>
              <div className="md:flex w-full p-4 tracking-wider rounded-xl">
                <p className="text-[16px] mt-6">Email:</p>
                <h5 className="mt-8 text-center text-[20px] text-[#635c5c] w-full">
                  {email}
                </h5>
              </div>
              <div className="md:flex w-full p-4">
                <p className="text-[16px] mt-6">Username:</p>
                <h5 className="border-spacing-5 capitalize text-center text-[18px] mt-8 text-[#635c5c] w-full">
                  {username}
                </h5>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <button className="bg-[#608A7D] rounded-xl capitalize tracking-wider text-white h-[40px] w-[90px]">
                  Logout
                </button>
              </div>
              <div>
                <button className="text-red-700 cursor-pointer text-[1em]">
                  <NavLink to="/reset">Change Password</NavLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLogin && (
        <p className="text-center text-white mt-4">You are logged in</p>
      )}
      <Footer />
    </div>
  );
};

export default UserDashboard;
