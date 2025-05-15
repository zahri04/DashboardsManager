import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [user, setUser] = useState({
    username: "",
    authorities: [],
  });

  const Login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const Logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser({
      username: "",
      authorities: [],
    });
  };

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({
          username: decodedToken.sub,
          authorities: decodedToken.authorities || [],
        });
      } catch (err) {
        console.error("Invalid token:", err);
        Logout(); // Clean up invalid token
      }
    } else {
      setUser({
        username: "",
        authorities: [],
      });
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
