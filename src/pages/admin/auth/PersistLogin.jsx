// import { Outlet } from "react-router-dom";
// import { useState, useEffect, useContext } from "react";
// import useRefreshToken from "../../hooks/useRefreshToken";
// import AuthContext from "../../context/Authprovider"; // Ensure correct path

// const PersistLogin = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const refresh = useRefreshToken();
//   const { auth, setAuth } = useContext(AuthContext);

//   useEffect(() => {
//     const verifyRefreshToken = async () => {
//       try {
//         const newAccessToken = await refresh();
//         console.log("Logged in. New access token:", newAccessToken);
//       } catch (error) {
//         console.error("Error during token refresh:", error);
//         setAuth(null); // Clear auth on error
//       } finally {
//         setIsLoading(false); // Ensure loading state is updated in both success and error cases
//       }
//     };

//     if (!auth?.accessToken) {
//       verifyRefreshToken();
//     } else {
//       setIsLoading(false); // No need to refresh if accessToken is present
//     }
//   }, [refresh, setAuth]); // Dependencies are correct here

//   useEffect(() => {
//     console.log(`isLoading: ${isLoading}`);
//     console.log(`auth: ${JSON.stringify(auth?.accessToken)}`);
//   }, [isLoading, auth?.accessToken]);

//   return isLoading ? <div>Loading...</div> : <Outlet />;
// };

// export default PersistLogin;
