// server side

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

// help u register an eventlistener
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required.');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room)

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // it send msg to only users online 
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        // this part send msg to all everyone connected to the server 
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
    });

        // listener act as the server
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        // emiter act as the client 
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });
    // generating the lat and longitude over here 
    socket.on('createLocationMessage', (coords) => {
        // THIS PART SEND MSG TO ALL USERS ONLINE
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })



    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} user has left`));
        };
    });
});



server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

