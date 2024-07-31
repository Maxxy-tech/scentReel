import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import vector1 from "../../assets/Vector 1 (3).png";
import divImg from "../../assets/Empty.png";
import { UserContext } from "../../context/userContext";
import { FaUpload } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import axiosInstance from "../../api/axiosInstance";

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(divImg);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    }
  }, [user]);

  const username = user?.username || "";
  const fullName = user?.fullName || "";
  const email = user?.email || "";

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const token = localStorage.getItem("token");
  console.log("Token:", token); // Log the token for debugging

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const profileImage = new FormData();
    profileImage.append("image", selectedFile);

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
      console.log("Image uploaded successfully:", response.data.imageUrl);
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
      <div className="flex-grow flex mt-[100px] flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl mt-10 md:mt-0">
          <div className="mt-[190px] relative flex flex-col items-center md:w-1/2 lg:w-1/3">
            <div className="absolute h-[623.57px] px-[10px] w-[444.68px] rounded-full -top-[368px] -left-[17px]">
              <img
                src={vector1}
                className="w-full max-w-sm hidden md:block"
                alt="Vector"
              />

              <div className="md:-left-[300px]">
                <div className="mt-[250px] py-10  right-[35%] md:-top-[350px] rounded-full relative w-[300px] flex justify-center items-center">
                  <img
                    src={profileImage}
                    className=" absolute  md:-top-[90px] -rotate-[178.42] border-[20px]   border-[rgba(94,168,145,0.53)] mb-[100px] rounded-full"
                    alt="Profile"
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="absolute  md:-top-[90px] -rotate-[178.42] border-[10px] md:px-[1000px] h-[90px] border-[rgb(96,138,125)] md:mb-[100px] rounded-full"
                    />
                  )}
                  <div className="md:top-[190px] top-[30px] gap-4 bg-[#608a7d93] w-[150px]  rounded-md absolute flex right-[50px] ml-[100px] ">
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      className="inset-0 opacity-0 cursor-pointer"
                    />
                    <label
                      htmlFor="file-upload"
                      className=" inset-0 flex items-center justify-center rounded-full opacity-70 hover:opacity-100  w-[100px] transition-opacity duration-300"
                    >
                      <RiImageAddFill className="text-white rounded-full  md:w-[30px] md:h-[30px] text-3xl " />
                    </label>
                    <button
                      onClick={handleFileUpload}
                      className="right-4 hover:text-[#524e4e] text-white p-2 rounded-full  items-center justify-center"
                      aria-label="Upload Image"
                    >
                      <FaUpload className="w-10  -top-[100px] rounded-full bg-[#2208086c]" />
                      <small>Upload</small>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white w-full mt-[80px] md:w-1/2 lg:w-2/3 h-[553px] p-6 md:p-8 lg:p-10 border border-[#608A7D] rounded-2xl">
            <h1 className="text-center text-2xl font-bold uppercase mb-6">
              {isLogin ? `Welcome, ${username}` : "Profile"}
            </h1>
            <div className="space-y-6">
              <p>{fullName}</p>
              <p>{email}</p>
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
