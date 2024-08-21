import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
      setProfileImage(user.profileImageUrl || divImg);
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

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
      setUploadError(null);
    } catch (error) {
      setUploadError("Failed to upload image. Please try again.");
    }
  };

  return (
    <div className="bg-[#608A7D] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col md:mt-[70px] mt-[60px] justify-center items-center px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl">
          <div className="relative flex flex-col items-center w-full md:w-1/2 lg:w-1/3 mb-8 md:mb-0">
            <img
              src={vector1}
              className="absolute hidden md:block md:w-[200px] md:h-[210px] lg:w-[300px] lg:h-[310px]"
              alt="Vector"
              style={{ top: "0", zIndex: "1" }}
            />
            <img
              src={profileImage || divImg}
              className="relative w-[120px] h-[160px] sm:w-[150px] sm:h-[200px] md:w-[200px] md:h-[250px] lg:w-[250px] lg:h-[300px] border-[4px] sm:border-[6px] md:border-[8px] border-[rgba(94,168,145,0.53)] rounded-full"
              alt="Profile"
              style={{
                transform: "matrix(-1, 0.03, 0.03, 1, 0, 0)",
                zIndex: "2",
              }}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="absolute w-[120px] h-[160px] sm:w-[150px] sm:h-[200px] md:w-[200px] md:h-[250px] lg:w-[250px] lg:h-[300px] top-0 border-[4px] sm:border-[6px] md:border-[8px] border-[rgb(96,138,125)] rounded-full"
                style={{
                  zIndex: "2",
                }}
              />
            )}
            <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 gap-4 bg-[#608a7daf] p-2 rounded-md">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="inset-0 opacity-0 cursor-pointer absolute"
              />
              <label
                htmlFor="file-upload"
                className="relative flex justify-center rounded-full opacity-70 hover:opacity-100 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] transition-opacity duration-300"
              >
                <RiImageAddFill className="text-white w-full h-full" />
              </label>
              <button
                onClick={handleFileUpload}
                className="relative hover:text-[#524e4e] text-white p-2 rounded-full items-center justify-center"
                aria-label="Upload Image"
              >
                <FaUpload className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#2208086c] rounded-full" />
                <small className="text-xs sm:text-sm md:text-base">
                  Upload
                </small>
              </button>
            </div>
            {uploadError && (
              <p className="text-red-500 mt-4 text-center">{uploadError}</p>
            )}
          </div>
          <div className="bg-white w-full p-4 md:p-6 border border-[#608A7D] rounded-2xl">
            <h1 className="text-center text-lg sm:text-xl md:text-2xl font-bold uppercase pb-0">
              {isLogin ? `Welcome, ${username}` : "Profile"}
            </h1>
            <div className="space-y-4 sm:space-y-6 font-serif mt-6">
              <div className="md:flex p-4 rounded-xl">
                <p className="text-sm sm:text-base md:text-lg">Name:</p>
                <h5 className="capitalize mt-2 sm:mt-4 text-center text-lg sm:text-xl md:text-2xl text-[#635c5c] w-full">
                  {fullName}
                </h5>
              </div>
              <div className="md:flex p-4 tracking-wider rounded-xl">
                <p className="text-sm sm:text-base md:text-lg">Email:</p>
                <h5 className="mt-2 sm:mt-4 text-center text-lg sm:text-xl md:text-2xl text-[#635c5c] w-full">
                  {email}
                </h5>
              </div>
              <div className="md:flex p-4">
                <p className="text-sm sm:text-base md:text-lg">Username:</p>
                <h5 className="capitalize mt-2 sm:mt-4 text-center text-lg sm:text-xl md:text-2xl text-[#635c5c] w-full">
                  {username}
                </h5>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button className="bg-[#608A7D] rounded-xl tracking-wider text-white h-[30px] sm:h-[35px] md:h-[40px] w-[70px] sm:w-[80px] md:w-[90px]">
                Logout
              </button>
              <button className="text-red-700 text-sm sm:text-base md:text-lg">
                <NavLink to="/reset">Change Password</NavLink>
              </button>
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
