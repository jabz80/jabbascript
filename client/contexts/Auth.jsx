import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check for token and role in local storage
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setAuthToken(token);
      setUserRole(role);
    }
  }, []);

  const login = (token, role) => {
    // Accept role as a parameter
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setAuthToken(token);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthToken(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
