// Importing modules
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

// Importing routers
const userRouter = require('./routes/user');
const avatarRouter = require('./routes/avatar');

const path = require('path');
const battleRouter = require('./routes/battle');
const storyRouter = require('./routes/story');

// Create server
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(express.json());
app.use(cors());
// app.use(logger)

// Using the routers
app.use('/', userRouter);
app.use('/battle', battleRouter);
app.use('/story', storyRouter);
app.use('/profile', avatarRouter);

// Exporting the app
module.exports = { app, io, server };
