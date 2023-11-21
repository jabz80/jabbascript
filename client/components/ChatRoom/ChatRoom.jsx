import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import '../../App.css';

const socket = io.connect('http://localhost:3000');

export default function ChatRoom() {
  //Room State
  const [room, setRoom] = useState('');

  // Messages States
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState([]);
  const [username, setUsername] = useState('');

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
    console.log(room);
  };

  const sendMessage = () => {
    socket.emit('send_message', { message, room });
  };

  const createUsername = () => {
    socket.emit('create_username', { username });
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived((prevMessage) => [...prevMessage, data.message]);
    });
  }, [socket]);

  // cleanup socket connection when component unmounts
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Username..."
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <button onClick={createUsername}>Create</button>
      <input
        placeholder="Message..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived.map((message, i) => (
        <div key={i}>{message}</div>
      ))}
    </div>
  );
}
