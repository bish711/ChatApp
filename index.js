const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
// const mongoose = require('mongoose');
const path = require('path');
const formatMessage = require('./utils/messages');
const { addUser, getRoomUsers, userLeave, getCurrentUser } = require('./utils/users');


// mongoose.connect('mongodb://localhost:27017/YelpCamp')
//     .then(() => {
//         console.log("MONGO CONNECTION OPEN");
//     })
//     .catch(err => {
//         console.log("ERROR CONNECTING TO MONGO");
//         console.log(err);
//     })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index1');
})

app.post('/chat', (req, res) => {
    const { username, room } = req.body;
    res.render('chat', { username, room });
})


// Run when client connects
io.on('connection', socket => {

    // When a user connects
    socket.on("user_join", function (data) {

        addUser(socket.id, data.username, data.room);

        // Welcome current user
        socket.emit("message", formatMessage("ChatApp Bot", "Welcome to ChatApp!"));

        //  Broadcast when a user connects
        const message = formatMessage("ChatApp Bot", `${data.username} has joined the chat`);
        if (data.room === "") {
            socket.broadcast.emit("message", message);
        } else {
            socket.join(data.room);
            socket.to(data.room).emit("message", message);
        }

        // Send list of users for the chat room
        io.to(data.room).emit('roomUsers', getRoomUsers(data.room));
    });


    // Listen for chat message
    socket.on("message", function (msg) {
        const user = getCurrentUser(socket.id);
        const message = formatMessage(user.username, msg);

        if (data.room === "") {
            socket.emit("message", message);
        } else {
            socket.to(user.room).emit("message", message)
        }
    });

    // When a user disconnects
    socket.on("disconnect", function (data) {
        const user = getCurrentUser(socket.id);
        if (user.room === "") {
            socket.broadcast.emit("user_leave", user.userName);
        } else {
            socket.to(user.room).emit("user_leave", user.username)
        }

        socket.emit('roomUsers', getRoomUsers(user.room));

    });

})

server.listen(3000, () => {
    console.log("SERVING ON PORT 3000");
})