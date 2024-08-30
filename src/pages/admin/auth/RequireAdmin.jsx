import { useContext } from "react";
import {UserContext} from '../../../context/userContext';
import {Navigate} from 'react-router-dom'
// RequireAdmin component to restrict access to the Admin page
const RequireAdmin = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user?.role !== "Admin") {
    return <Navigate to="/Login-Admin" replace />; // Redirect to login if not admin
  }

  return children;
};

export default RequireAdmin;
