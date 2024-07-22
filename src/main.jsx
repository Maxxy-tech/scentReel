import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

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
import {AuthContextProvider} from './context/authContext'

import RequireAuth from './components/RequiredAuth'

const router = createBrowserRouter([
  //unprotected Routes
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
    path: "brand",
    element: (
      <RequireAuth>
        <Brand />
      </RequireAuth>
    ),
  },
  {
    path: "forum",
    element: (
      <RequireAuth>
        <Forum />
      </RequireAuth>
    ),
  },
  {
    path: "blog",
    element: (
      <RequireAuth>
        <Blog />
      </RequireAuth>
    ),
  },
  {
    path: "brand",
    element: <Brand />,
  },
  {
    path: "about",
    element: <About />,
  },

  {
    path: "contact",
    element: <Contact />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <AuthContextProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
     </AuthContextProvider>
  </React.StrictMode>
);
