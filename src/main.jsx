// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/layout/Layout";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Register";
import Brand from "./components/brand/Brand";
import Blog from "./components/blog/Blog";
import Forum from "./components/forum/Forum";
import Home from "./components/Home";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import ErrorPage from "./components/404";
import { UserProvider } from "./context/userContext";
import { AuthProvider } from "./context/Authprovider";
// import {AuthContextProvider} from './context/authContext'
import RequireAuth from "./components/RequiredAuth";
import UserDashboard from "./pages/user/UserDashboard";
import ForgotPwd from "./components/auth/ForgotPwd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "forgot-pwd",
    element: <ForgotPwd />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "user-dashboard",
    element: <UserDashboard />,
  },
  {
    element: <RequireAuth />, // Protected routes
    children: [
      {
        path: "brand",
        element: <Brand />,
      },
      {
        path: "forum",
        element: <Forum />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {/* <AuthContextProvider> */}
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    {/* </AuthContextProvider> */}
    </AuthProvider>

  </React.StrictMode>
);
