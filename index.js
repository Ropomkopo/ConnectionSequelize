var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('http://localhost:3000');
});