import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
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
  
  const logout = () => {
    // Clear session storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);