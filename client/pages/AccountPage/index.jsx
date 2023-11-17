import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';

function Account() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
const [submitClicked, setSubmitClicked] = useState(false);
const [currentAvatarUrl, setCurrentAvatarUrl] = useState('')

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

  const getAllAvatars = async () => {
    try {
      const response = await fetch(`https://jabbascript-api.onrender.com/avatar`);
      const data = await response.json();
      setAvatars(data);
    } catch (error) {
      console.error('Error fetching avatars:', error);
    }
  };

  const clickHandler = (e) => setSelectedAvatar(Number(e.target.id))
  const handleAvatarChange = (e) => {
    e.preventDefault()
    setSubmitClicked(true);
    setCurrentAvatarUrl(avatars.find((avatar) => avatar.avatar_id === selectedAvatar)?.img_url)
  };

  const changeAvatar = async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`https://jabbascript-api.onrender.com/update`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer: ${token}`,
        },
        method: 'PATCH',
        body: JSON.stringify({ 'avatar_id': selectedAvatar }),
      });

    } catch (error) {
      console.error('Error updating avatar:', error);
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
      getAllAvatars();
      setLoading(false);
    }
  }, [userData]);

 useEffect(() => {
  if (selectedAvatar !== 0 && submitClicked) {
    changeAvatar();
    setSubmitClicked(false);
  }
}, [submitClicked]);


  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='d-flex flex-column flex-grow-1 mb-auto py-5 container'>
      <div className='row'>
        <div className='col-6'>
          <h1>Your data</h1>
          <p><img src={currentAvatarUrl || userData.img_url} className='w-25' alt="User Avatar" /></p>
          <div className="d-flex flex-wrap">
            <form onSubmit={handleAvatarChange}>
              {avatars.map(avatar => (
                <label key={avatar.avatar_id}>
                  <input
                    type="radio"
                    id={avatar.avatar_id}
                    name="avatar"
                    onChange={clickHandler}
                    style={{ display: 'none' }}
                  />
                  <img
                    id={avatar.avatar_id}
                    style={{ 'width': '100px', cursor: 'pointer', opacity: selectedAvatar === avatar.avatar_id ? 0.5 : 1, }}
                    src={avatar.img_url}
                    alt={`Avatar ${avatar.avatar_id}`}
                  />
                </label>
              ))}
              <button className='btn btn-info' type="submit" >
                Change Avatar
              </button>
            </form>

          </div>
          <p><b>Username</b>: {userData.username}</p>
          <p><b>Email</b>: {userData.email}</p>
          <p>
            <b>Points</b>: {points} | <Link onClick={updatePoints} className='small' to="#">Add 25 Points</Link>
          </p>
          <button className='btn btn-info' onClick={() => handleLogout(navigate)}>Logout</button>
        </div>
        <div className='col-6'>
          <h1>Your recent games</h1>
          {/* <Points/> */}
        </div>
      </div>
    </div>
  );
}

const handleLogout = (navigate) => {
  localStorage.removeItem('token');
  window.location.reload();
  navigate('/');
};

export default Account;
