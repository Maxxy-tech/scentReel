import { createContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    try {
      const storedAuth = JSON.parse(localStorage.getItem("auth"));
      if (storedAuth) {
        setAuth(storedAuth);
      }
    } catch (error) {
      console.error("Failed to load authentication state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (auth) {
        localStorage.setItem("auth", JSON.stringify(auth));
      } else {
        localStorage.removeItem("auth");
      }
    } catch (error) {
      console.error("Failed to save authentication state to localStorage", error);
    }
  }, [auth]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ auth, setAuth }), [auth]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
