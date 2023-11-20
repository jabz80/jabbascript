import React, { useContext } from 'react';
import { UserContext } from '../../contexts/User';

function MultiplayerFighter({
  firstFighter,
  secondFighter,
  roundWinner,
  healthPlayerOne = 100,
  healthPlayerTwo = 100,
  currentAmountOfPlayers,
}) {
  const { userData } = useContext(UserContext);
  return (
    <div className="text-center h-100">
      <div>
        {firstFighter && userData
          ? userData?.username
          : secondFighter && userData && userData.username}
      </div>
      <div
        className="progress offset-3 col-6"
        role="progressbar"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="progress-bar bg-success"
          style={{
            width: `${firstFighter ? healthPlayerOne : healthPlayerTwo}%`,
          }}
        >
          {firstFighter ? healthPlayerOne : healthPlayerTwo}%
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${
            currentAmountOfPlayers === 2
              ? userData?.img_url
              : currentAmountOfPlayers === 1 && userData?.img_url
          })`,
        }}
        className="fighterBlock char-bg h-75 mt-4"
        id={`${
          secondFighter && roundWinner == 1
            ? 'fighter-shaking'
            : firstFighter && roundWinner == 2 && 'fighter-shaking'
        }`}
      />
    </div>
  );
}

export default MultiplayerFighter;