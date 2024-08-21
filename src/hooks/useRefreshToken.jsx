import axios from "axios";
// import { setAuth } from "../api/Token";
import AuthContext from '../context/Authprovider'
import {useContext} from 'react'
const useRefreshToken = () => {

 const { setAuth } = useContext(AuthContext);
  const refresh = async () => {
    const response = await axios.get("/refresh-token",{
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);

      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};
export default useRefreshToken