const { Server } = require('socket.io');
const DB = require('./DB/ecommerce');
const db = new DB();
if (!db.tableExists('messages')) {
    db.createTable('messages');
}

let io;
let messages = [];

class Socket{
    static init(httpServer){
        console.log('Socket init');
        io = new Server(httpServer);
        io.on('connection', (socket) => {
            console.log('a user connected', socket.id);

            messages = db.getAll('messages');

            socket.emit('history', messages);

            socket.on('titleChange', (msg) => {
                io.emit('titleChange', {id: socket.id, message: msg});
            });

            socket.on('priceChange', (msg) => {
                io.emit('priceChange', msg);
            });

            socket.on('message', (msg) => {
                db.insert('messages', msg);
                io.emit('message', msg);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }

    static getMessages(){
        return messages;
    }
}

module.exports = Socket