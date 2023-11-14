import { useEffect, useState } from 'react';

import io from 'socket.io-client';

const socket = io.connect('https://jabbascript-api.onrender.com');




export default function Gamepage() {
  const joinRoom = () => {
    socket.emit('join_room');
  };

  const leaveRoom = () => {
    socket.emit('jermaine');
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      leaveRoom();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); 

  return (
    <div>
      <button onClick={joinRoom}>Play Multiplayer</button>
      <button onClick={leaveRoom}>Leave Game</button>
    </div>
  );
}
