import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        //toast.error('No authentication token');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No authentication token'
        })
      }

      try {
        const response = await axios.get('https://jabbascript-api.onrender.com/token', {
          headers: {
            Authorization: `Bearer: ${token}`
          },
        });

        setUserData(response.data);
      } catch (error) {
        //toast.error(error.response?.data?.error || 'Unable to locate user');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Unable to locate user'
        })
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
