(function(){
    const productTitle = document.getElementById('title');
    const productPrice = document.getElementById('price');
    const newItemTitle = document.getElementById('newItemTitle');
    const newItemPrice = document.getElementById('newItemPrice');
    const userEmail = document.getElementById('email');
    const userMessage = document.getElementById('message');
    const sendMessage = document.getElementById('sendMessage');
    const messagesContainer = document.getElementById('messagesContainer');

    const socket = io();

    productTitle.addEventListener('keyup', function(event){
        socket.emit('titleChange', event.target.value);
    });

    productPrice.addEventListener('keyup', function(event){
        socket.emit('priceChange', event.target.value);
    });

    sendMessage.addEventListener('click', function(event){
        event.preventDefault();
        socket.emit('message', userEmail.value, userMessage.value);
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
        messagesContainer.innerHTML += `<div class="alert alert-info" role="alert"><strong>${msg.email}:</strong> ${msg.message}</div>`
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    )

}
)(
);