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

const queue = []; // Queue to keep track of waiting players
const teams = {}; // Store teams by socket ID

io.on('connection', (socket) => {
    console.log('A user connected');
    queue.push(socket);
    console.log(queue.length);
    console.log('---------');

    // Check if there are two players in the queue
    if (queue.length >= 2) {
        const player1 = queue.shift();
        const player2 = queue.shift();

        const room = `room-${player1.id}-${player2.id}`;
        player1.join(room);
        player2.join(room);
        console.log(`User with ID ${player1.id} and User with ID ${player2.id} joined room ${room}`);

        io.to(room).emit('startGame', room);
    }

    socket.on('submitPlayerTeam', (team) => {
        console.log(`User with ID ${socket.id} submitted their team: ${team.length}}`);
        teams[socket.id] = team;

        const rooms = Array.from(socket.rooms);
        const room = rooms.find(r => r !== socket.id); // Find the room the user is in

        if (room) {
            const opponentId = Array.from(io.sockets.adapter.rooms.get(room)).find(id => id !== socket.id);
            if (opponentId && teams[opponentId]) {
                // Send each player's team to the other player
                socket.to(room).emit('receiveOpponentTeam', teams[socket.id]);
                socket.emit('receiveOpponentTeam', teams[opponentId]);
            }
        }
    });

    socket.on('leaveQueue', () => {
        console.log(`User with ID ${socket.id} is leaving the queue`);
        queue = queue.filter(s => s !== socket);
        console.log(queue.length);
        console.log('---------');
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        queue = queue.filter(s => s !== socket);
        delete teams[socket.id];
        console.log(queue.length);
        console.log('---------');
    });
});

const PORT = process.env.PORT || 3010;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
