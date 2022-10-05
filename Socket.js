const { Server } = require('socket.io');

let io;

class Socket{
    static init(httpServer){
        console.log('Socket init');
        io = new Server(httpServer);
        io.on('connection', (socket) => {
            console.log('a user connected', socket.id);

            socket.on('message', (msg) => {
                io.emit('message', {id: socket.id, message: msg});
            });

            socket.on('priceChange', (msg) => {
                io.emit('priceChange', msg);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}

module.exports = Socket