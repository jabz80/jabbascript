import React, { useEffect } from 'react'
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');
function index() {
  return <div>index</div>;
}

export default index
