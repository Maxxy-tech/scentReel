import { useEffect, useState,useContext } from "react";
import AuthContext from "../context/Authprovider";
import useAxiosInstance from "./useAxiosInstance";

const useAuth = () => {
  // const [auth, setAuthState] = useState(getAuth());
  const axiosInstance = useAxiosInstance();
const { auth, setAuth } = useContext(AuthContext);
  useEffect(() => {
    const checkAuth = async () => {
      if (!auth || !auth.accessToken) {
        const storedAuth = auth;
        if (storedAuth && storedAuth.accessToken) {
          try {
            const response = await axiosInstance.get("/auth/check-token");
            if (response.status === 200) {
              setAuth(storedAuth);
            } else {
              // Handle token expiration or invalid token
              setAuth(null);
              localStorage.removeItem("auth");
            }
          } catch (error) {
            console.error("Error verifying token:", error);
            setAuth(null);
            localStorage.removeItem("auth");
          }
        }
      }
    };

    checkAuth();
  }, [auth, axiosInstance,setAuth]);

  const login = (authData) => {
    setAuth(authData);
    setAuth(authData);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
  };

  return { auth, login, logout };
};

export default useAuth;
