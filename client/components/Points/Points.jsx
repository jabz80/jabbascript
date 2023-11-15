import React, { useState, useEffect } from 'react';


const dummyPoints = [
    { id: 1, username: 'user1', score: 100 },
    { id: 2, username: 'user2', score: 85 },
    { id: 3, username: 'user3', score: 92 },
    { id: 3, username: 'user4', score: 93 },
    { id: 3, username: 'user5', score: 72 },
    { id: 3, username: 'user6', score: 22 },
    { id: 3, username: 'user7', score: 45 },
    { id: 3, username: 'user8', score: 63 },
    { id: 3, username: 'user9', score: 69 },
  ];




const Points = () => {
//   const [pointsData, setPointsData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/url to go here'); // Replace with your actual backend API endpoint
//         const data = await response.json();
//         setPointsData(data);
//       } catch (error) {
//         console.error('Error fetching points data:', error);
//       }
//     };

//     fetchData();
//   }, []); 

  return (
    <div>
      <h2>Points</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {dummyPoints.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Points;