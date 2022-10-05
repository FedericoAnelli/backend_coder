const { Server } = require('socket.io');

let io;
let messages = [];

class Socket{
    static init(httpServer){
        console.log('Socket init');
        io = new Server(httpServer);
        io.on('connection', (socket) => {
            console.log('a user connected', socket.id);

            socket.on('titleChange', (msg) => {
                io.emit('titleChange', {id: socket.id, message: msg});
            });

            socket.on('priceChange', (msg) => {
                io.emit('priceChange', msg);
            });

            socket.on('message', (userEmail, message) => {
                io.emit('message', {email: userEmail, message: message});
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}

module.exports = Socket