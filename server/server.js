const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');


const port = process.env.PORT || 8000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

// help u register an eventlistener
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});

;

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

