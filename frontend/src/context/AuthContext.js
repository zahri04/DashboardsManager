import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken]           = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [user, setUser]             = useState({ username: "", authorities: [] });

  const Login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setIsLoggedIn(true);
  };

  const Logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser({ username: "", authorities: [] });
  };

  useEffect(() => {
    if (!token) {
      setUser({ username: "", authorities: [] });
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const nowSec  = Date.now() / 1000;

      // if token is expired, force logout
      if (decoded.exp && decoded.exp < nowSec) {
        console.warn("Token expired at", decoded.exp, "– logging out.");
        Logout();
        return;
      }

      console.log("Decoded token:", decoded);
      // otherwise set user info
      setUser({
        username:    decoded.sub,
        authorities: decoded.authorities || [],
      });

    } catch (err) {
      console.error("Invalid token:", err);
      Logout();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
