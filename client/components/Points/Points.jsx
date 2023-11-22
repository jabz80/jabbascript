import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Points = () => {
  const [pointsData, setPointsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jabbascript-api.onrender.com/score');
        const data = await response.json();
        setPointsData(data);
      } catch (error) {
        console.error('Error fetching points data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className='d-flex flex-column flex-grow-1 py-5 container'>
      <div className='d-flex align-items-center flex-column h-100'>
 <h1>Leaderboard</h1>
              {!Array.isArray(pointsData)   ?
              <>
       <p>'No players → no leaders!'</p>
       <p><Link to="/register" className='btn btn-fantasy text-white'>Be the first one!</Link></p>
              </>
       :
       <>
      <div className='col-3'>
        <div className='row border-bottom py-3'>
          <div className='col-2 d-flex align-items-center justify-content-center'>Rank</div>
          <div className='col-6 d-flex align-items-center justify-content-start'>Username</div>
          <div className='col-4 d-flex align-items-center justify-content-center'>Score</div>
        </div>

        {pointsData.map((user, index) => (
          <div className='row border-bottom py-3' key={user.user_id}>
            <span className='col-2 d-flex align-items-center justify-content-center'>{index + 1}</span>
            <span className='col-6 d-flex align-items-center justify-content-start'>{user.username}</span>
            <span className='col-4 d-flex align-items-center justify-content-center'>{user.score}</span>
          </div>
        ))}
      </div>
        </>
        }
      
      </div>
     

    </div>
  );
};

export default Points;
