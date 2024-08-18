import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./components/home/Hero";
import Showcase from "./components/Showcase";
import {
  UserContextProvider,
  UserContext,
} from "./context/userContextProvider";
import { AuthProvider, AuthContext } from "./context/Authprovider";

const App = () => {
  const { auth } = useContext(AuthContext); // Retrieve auth state from context
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [auth, navigate]);

  return (
    <AuthProvider>
      <UserContextProvider>
        <AppContent />
      </UserContextProvider>
    </AuthProvider>
  );
};

const AppContent = () => {
  const user = useContext(UserContext);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User context: ", user);
    console.log("Auth context: ", auth);
  }, [user, auth]);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth && storedAuth.accessToken) {
      setAuth(storedAuth);
      navigate("/", { replace: true }); // Navigate to home or a default page
    }
  }, [setAuth, navigate]);

  return (
    <>
      <Home value={user,auth} />
      <Showcase />
    </>
  );
};

export default App;
