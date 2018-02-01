const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

// help u register an eventlistener
io.on('connection', (socket) => {
    console.log('New user connected');


    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user join'));

        // listener act as the server
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        // emiter act as the client 
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });
    // generating the lat and longitude over here 
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })



    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});

;

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

