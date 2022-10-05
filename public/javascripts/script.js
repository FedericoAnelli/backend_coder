
(   function(){
    const productTitle = document.getElementById('title');
    const productPrice = document.getElementById('price');
    const newItemTitle = document.getElementById('newItemTitle');
    const newItemPrice = document.getElementById('newItemPrice');
    const userEmail = document.getElementById('email');
    const userMessage = document.getElementById('message');
    const chatForm = document.getElementById('chatForm');
    const messagesContainer = document.getElementById('messagesContainer');

    const socket = io();

    productTitle.addEventListener('keyup', function(event){
        socket.emit('titleChange', event.target.value);
    });

    productPrice.addEventListener('keyup', function(event){
        socket.emit('priceChange', event.target.value);
    });

    chatForm.addEventListener('submit', (event) =>{
        event.preventDefault();
        const date = new Date();
        const data = {
            email: userEmail.value,
            message: userMessage.value,
            date: date.toLocaleString()
        };
        socket.emit('message', data);
        userMessage.value = '';
    });

    socket.on('connect', () => {
        console.log('Connected');
    });

    socket.on('titleChange', (msg) => {
        newItemTitle.innerText = msg.message;
    })

    socket.on('priceChange', (msg) => {
        newItemPrice.innerText = msg;
    })

    socket.on('message', (msg) => {
        messagesContainer.innerHTML += `<div class="alert alert-info" role="alert"><strong>[${msg.date}] ${msg.email}:</strong> ${msg.message}</div>`
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    )

    socket.on('history', (msg) => {
        msg.forEach(message => {
            messagesContainer.innerHTML += `<div class="alert alert-info" role="alert"><strong>${message.email}:</strong> ${message.message}</div>`
        });
    }
    )

}
)(
);