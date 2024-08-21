import { useEffect,useContext } from "react";
import { axiosInstance } from "../api/axiosInstance";
import useRefreshToken from "./useRefreshToken";
import AuthContext from "../context/Authprovider";

// Custom hook for using axios instance with token handling
const useAxiosInstance = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useContext(AuthContext);

  // Set up interceptors for request and response
  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        // Add Authorization header if not present
        if (!config.headers[`Authorization`]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  // Return the axios instance for use in components
  return axiosInstance;
};

export default useAxiosInstance;
