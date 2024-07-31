import { useContext, useEffect } from "react";
import Home from "./components/home/Hero";
import Showcase from "./components/Showcase";
import {
  UserContextProvider,
  UserContext,
} from "./context/userContextProvider";
import AuthContext  from './context/Authprovider'
import {AuthProvider  } from "./context/Authprovider";

const App = () => {
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

  useEffect(() => {
    console.log("User context: ", user);
    console.log("Auth context: ", auth);
  }, [user, auth]);

  return (
    <>
      <Home value={user} />
      <Showcase />
    </>
  );
};

export default App;
