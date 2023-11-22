import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token');
        return;
      }

      try {
        const response = await fetch('https://jabbascript-api.onrender.com/token', {
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
        console.error(error.message || 'Unable to locate user');
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
