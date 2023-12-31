
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No authentication token');
      }
      try {
        const response = await fetch('https://jabbascript-backend-79d72b5d4bfa.herokuapp.com/token', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Unable to locate user');
        }
        const responseData = await response.json();
        setUserData(responseData);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Unable to locate user');
      } 
    };
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};
