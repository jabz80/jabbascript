import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Account() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
    return <div>No user data available</div>;
  }

  return (
    <div>
      <h1>User Account Details</h1>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default Account;
