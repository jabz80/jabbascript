import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { Points } from '../../components';

function Account() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();

  const fetchUserPoints = async () => {
    try {
      const response = await fetch(`https://jabbascript-api.onrender.com/score/${userData.user_id}`);
      const data = await response.json();
      setPoints(data.score);
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  };

  const updatePoints = async () => {
    try {
      await fetch(`https://jabbascript-api.onrender.com/score/${userData.user_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({ 'newScore': points + 25 }),
      });
      setPoints(points + 25);
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserPoints();
      setLoading(false);
    }
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='d-flex flex-column flex-grow-1 mb-auto p-5 container'>
      <div className='row'>
        <div className='col'>
          <h1>Your data</h1>
          <p><img src={userData.img_url} className='w-25' alt="User Avatar" /></p>
          <p><b>Username</b>: {userData.username}</p>
          <p><b>Email</b>: {userData.email}</p>
          <p>
            <b>Points</b>: {points} | <a onClick={updatePoints} className='small' href="#">Add 25 Points</a>
          </p>
          <button className='btn btn-info' onClick={() => handleLogout(navigate)}>Logout</button>
        </div>
        <div className='col'>
          <h1>Your recent games</h1>
          <Points/>
        </div>
      </div>
    </div>
  );
}

const handleLogout = (navigate) => {
  localStorage.removeItem('token');
  location.href.reload()
  navigate('/');
};

export default Account;
