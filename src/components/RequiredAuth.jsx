import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const RequireAuth = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
