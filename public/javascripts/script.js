(function(){
    const productTitle = document.getElementById('title');
    const productPrice = document.getElementById('price');
    const newItemTitle = document.getElementById('newItemTitle');
    const newItemPrice = document.getElementById('newItemPrice');

    const socket = io();

    productTitle.addEventListener('keyup', function(event){
        socket.emit('message', event.target.value);
    });

    productPrice.addEventListener('keyup', function(event){
        socket.emit('priceChange', event.target.value);
    });

    socket.on('connect', () => {
        console.log('Connected');
    });

    socket.on('message', (msg) => {
        newItemTitle.innerText = msg.message;
    })

    socket.on('priceChange', (msg) => {
        newItemPrice.innerText = msg;
    })

})();