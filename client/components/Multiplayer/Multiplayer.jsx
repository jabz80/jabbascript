import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

export default function Gamepage() {
  const joinRoom = () => {
    socket.emit('join_room');
  };

  const leaveRoom = () => {
    socket.emit('jermaine');
  };

  return (
    <div>
      <button onClick={joinRoom}>Play Multiplayer</button>
      <button onClick={leaveRoom}>Leave Game</button>
    </div>
  );
}
