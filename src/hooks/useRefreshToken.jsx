import axios from "axios";
import AuthContext from "../context/Authprovider";
import { useContext } from "react";

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh-token", {
        withCredentials: true,
      });

      setAuth((prev) => {
        console.log("Previous Auth State:", JSON.stringify(prev));
        console.log("New Access Token:", response.data.accessToken);

        return { ...prev, accessToken: response.data.accessToken };
      });

      return response.data.accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Optionally handle token refresh errors here
      throw error; // Re-throw error if needed
    }
  };

  return refresh;
};

export default useRefreshToken;
