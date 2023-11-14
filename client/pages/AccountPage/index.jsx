import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Account() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No authentication token');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3005/token', {
          headers: {
            Authorization: token
          }
        });

        setUserData(response.data);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Unable to locate user');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    navigate('/login');
  }

  return (
    <div>
      <h1>User Account Details</h1>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <button onClick={() => handleLogout(navigate)}>Logout</button>
    </div>
  );
}

const handleLogout = (navigate) => {
  localStorage.removeItem('token');
  navigate('/login'); // Redirect to login page after logout
};

export default Account;
