// src/api/axiosInstance.js
import axios from "axios";

// Axios instance for non-authenticated requests
export const axiosOrd = axios.create({
  baseURL: "https://scentreel-be.onrender.com/",
});

// Axios instance for authenticated requests
export const axiosInstance = axios.create({
  baseURL: "https://scentreel-be.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // Include cookies in requests
});


//   axiosInstance.interceptors.request.use(
//   async (config) => {
//     let auth = getAuth();

//     if (!auth?.accessToken) {
//       try {
//         const response = await axios.get("/refresh-token", {
//           withCredentials: true,
//         });
//         setAuth(response.data);
//         auth = response.data;
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     }

//     config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const response = await axios.get("/users/refresh-token", {
//           withCredentials: true,
//         });
//         setAuth(response.data);
//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${response.data.accessToken}`;
//         originalRequest.headers[
//           "Authorization"
//         ] = `Bearer ${response.data.accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

