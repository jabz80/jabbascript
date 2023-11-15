import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { Points } from '../../components';

function Account() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>User Account Details</h1>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <button onClick={() => handleLogout(navigate)}>Logout</button>
      <Points />
    </div>
  );
}

const handleLogout = (navigate) => {
  localStorage.removeItem('token');
  navigate('/');
};

export default Account;
