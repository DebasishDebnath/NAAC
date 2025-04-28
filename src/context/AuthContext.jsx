import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  // Initialize user from session storage on app load
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    
    if (token && role) {
      setUser({ token, role });
    }
  }, []);

  const loginUser = (userData) => {
    // Save to session storage
    sessionStorage.setItem("token", userData.token);
    sessionStorage.setItem("role", userData.role);
    setUser(userData);
  };
  
  const logout = (role) => {
    // const finalRole = role || sessionStorage.getItem("role") || "user";
    window.location.href = `/login/${role.toLowerCase()}`;
    sessionStorage.clear();
    setUser(null);
    // navigate(`/login/${finalRole.toLowerCase()}`);
  };
  

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);