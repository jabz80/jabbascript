import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function Account() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [points, setPoints] = useState(0);
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState('')
  const [games, setGames] = useState([])
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

    
useEffect(() => {
  if (userData?.img_url === 'https://github.com/jabz80/jabbascript/blob/backend/server/avatar_images/default.png?raw=true') {
    setShow(true);
  } else {
    setShow(false);
  }
}, [userData]);

  const fetchUserPoints = async () => {
    try {
      const response = await fetch(`https://jabbascript-backend-79d72b5d4bfa.herokuapp.com/score/${userData.user_id}`);
      const data = await response.json();
      setPoints(data.score);
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  };

  const getAllAvatars = async () => {
    try {
      const response = await fetch(`https://jabbascript-backend-79d72b5d4bfa.herokuapp.com/avatar`);
      const data = await response.json();
      setAvatars(data);
    } catch (error) {
      console.error('Error fetching avatars:', error);
    }
  };

  const getAllGames = async () => {
    try {
      const response = await fetch(`https://jabbascript-backend-79d72b5d4bfa.herokuapp.com/games`);
      const data = await response.json();
      const userGames = data.filter(game => game.user_id === userData.user_id);
      setGames(userGames);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const clickHandler = (e) => setSelectedAvatar(Number(e.target.id))

  const handleAvatarChange = (e) => {
    e.preventDefault()
    setCurrentAvatarUrl(avatars.find((avatar) => avatar.avatar_id === selectedAvatar)?.img_url)
    changeAvatar();
    setShow(false)
    setTimeout(() => {
      window.location.reload()
    }, 500);
  };

  const changeAvatar = async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`https://jabbascript-backend-79d72b5d4bfa.herokuapp.com/update`, {
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


  useEffect(() => {
    if (userData) {
      fetchUserPoints()
      getAllAvatars();
      setLoading(false);
      getAllGames();
    }
  }, [userData]);



//  useEffect(() => {
//   if (selectedAvatar !== 0 && submitClicked) {
//     setShow(false)
//     changeAvatar();
//     setSubmitClicked(false);

//   }
// }, [submitClicked]);


  if (loading) {
    return (
    <div style={{'height':'100dvh'}}  className='d-flex flex-column justify-content-center align-items-center'>
        <div class="spinner-border mb-3" role="status">
  
  </div>
    <div className='d-flex justify-content-center align-items-center'>Loading...</div>
    </div>
    )
  }

  return (
    <div className='d-flex flex-column flex-grow-1 mb-auto py-5 container'>
      <div className='row'>
        <div className='col-4'>
          <div className='p-4 bg-light d-flex justify-content-center flex-column w-100 align-items-center shadow-sm'>
          <h1>Your data</h1>
          
<div className="avatar-container d-flex justify-content-center">
  {userData?.img_url == 'https://github.com/jabz80/jabbascript/blob/backend/server/avatar_images/default.png?raw=true' ? 
     <img
        src={userData?.img_url}
        className="w-50"
        alt="User Avatar"
      />
  :
  <>
      <svg
      data-bs-toggle="modal" data-bs-target="#exampleModal"
      onClick={handleShow}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="grey"
        className="bi bi-pencil-square"
        viewBox="0 0 16 16"
      >
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
        <path
          fillRule="evenodd"
          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
        />
      </svg>
      <img
        src={userData?.img_url}
        className="w-50"
        alt="User Avatar"
      />
      </>
  }
    </div>


            <hr/>
          <p><b>Username</b>: {userData.username}</p>
          <p><b>Email</b>: {userData.email}</p>
          <p><b>Points</b>: {points}</p>
          <button className='btn  btn-fantasy text-white' onClick={() => handleLogout(navigate)}>Logout</button>
          </div>
        </div>

        <div className='col-8'>
          <div className='p-4 rounded bg-light shadow-sm'>
            <h1>Your recent games</h1>
                    {games.length === 0 ? (
                      <>
              <div>You haven't play a game yet!</div>
                      <div className='mt-4'>
                        <p><i>Begin your journey right now...</i></p>
          <Link to="/story">
            <button
              type="button"
              className="btn btn-fantasy text-white btn-lg me-4"
              data-mdb-ripple-color="#c33232"
            >
              
              Quest
            </button>
          </Link>
          <Link to="/practice">
            <button
              type="button"
              className="btn btn-fantasy text-white btn-lg"
              data-mdb-ripple-color="#c33232"
            >
              
              Fighting 
            </button>
          </Link>
        </div>
          </>
            ) : (
              <>
                <div className='row border-bottom py-3'>
                  <div className='col-2 d-flex align-items-center justify-content-center'>Game</div>
                  <div className='col-6 d-flex align-items-center justify-content-start'>Date of play</div>
                  <div className='col-4 d-flex align-items-center justify-content-center'>Result</div>
                </div>
                {games.map(el => (
                  <div className='row border-bottom py-3' key={el.game_id}>
                    <span className='col-2 d-flex align-items-center justify-content-center'>{el.game_id}</span>
                    <span className='col-6 d-flex align-items-center justify-content-start'>{new Date(el.date_played).toISOString().split('T')[0]}</span>
                    <span className='col-4 d-flex align-items-center justify-content-center'>
                      {el.game_status === true ? 'Win' : el.game_status === false ? 'Lost' : 'Draw'}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
          

        </div>
      </div>
 <Modal show={show} id="exampleModal" centered>
        <Modal.Header className='d-flex justify-content-center'>
          <Modal.Title>Choose Your Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAvatarChange}>
            <div className='d-flex flex-wrap text-center'>
               {avatars
                .filter((avatar) => avatar.avatar_id !== 1)
                .map((avatar) => (
                <label key={avatar.avatar_id}>
                  <input
                    type='radio'
                    id={avatar.avatar_id}
                    name='avatar'
                    onChange={clickHandler}
                    style={{ display: 'none' }}
                  />
                  <img
                    id={avatar.avatar_id}
                    style={{
                      margin: '.5rem',
                      width: '100px',
                      cursor: 'pointer',
                      opacity: selectedAvatar === avatar.avatar_id ? 0.5 : 1,
                    }}
                    src={avatar.img_url}
                    alt={`Avatar ${avatar.avatar_id}`}
                  />
                </label>
              ))}
            </div>
            <Modal.Footer className='d-flex justify-content-center'>
              <button className='btn btn-fantasy text-white' type="submit" >
                Change Avatar
              </button>

            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

const handleLogout = (navigate) => {
  localStorage.removeItem('token');
  window.location.reload();
  navigate('/');
};

export default Account;
