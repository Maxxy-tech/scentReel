import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import AuthContext from "../context/Authprovider";

const RequireAuth = () => {
  const { user } = useContext(UserContext);
  const { auth } = useContext(AuthContext); // Access authentication context
  const location = useLocation();

  // Check if both user and auth are available
  if (!auth?.accessToken || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
    // If user is authenticated, render the children components
      
  }

  return <Outlet />;
};

export default RequireAuth;
