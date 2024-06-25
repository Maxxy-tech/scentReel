import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Login from './components/auth/Login'
import Signup from './components/auth/Register'
import Brand  from './components/brand/Brand'
import Blog from './components/blog/Blog'
import Forum from './components/forum/Forum'
import Home from './components/Home';
import About from "./components/about/About"
import Contact from './components/contact/Contact'
import ErrorPage from "./components/404";
// import Hero from './components/home/Hero'
// import Layout from './components/layout/Layout'
const router = createBrowserRouter([
  // {
  //   path:'/',
  //   element: <Layout />,
  // },
  {

     path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path:'login',
    element:<Login />,
  },
  {
    path:'blog',
    element:<Blog />,
  },
  {
    path:'signup',
    element:<Signup />,
  },
  {
    path:'forum',
    element:<Forum />,
  },
  {
    path:'brand',
    element:<Brand />,
  },
  {
    path:'about',
    element:<About />,
  },
  {
    path:'contact',
    element:<Contact />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(


  <React.StrictMode>


    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
