// pokemon-battle/server/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all origins by default

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000', // Update with your client address
        methods: ['GET', 'POST']
    }
});

let rooms = {}; // To keep track of rooms and players

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (room) => {
        if (!rooms[room]) {
            rooms[room] = [];
        }

        if (rooms[room].length < 2) {
            rooms[room].push(socket.id);
            socket.join(room);
            console.log(`User with ID ${socket.id} joined room ${room}`);

            if (rooms[room].length === 2) {
                io.to(room).emit('startGame', room);
            }
        } else {
            socket.emit('roomFull', room);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        for (let room in rooms) {
            if (rooms[room].includes(socket.id)) {
                rooms[room] = rooms[room].filter(id => id !== socket.id);
                if (rooms[room].length === 0) {
                    delete rooms[room];
                }
                break;
            }
        }
    });
});

const PORT = process.env.PORT || 3010;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
