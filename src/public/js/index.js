const socket = io();

socket.emit('mensaje', 'Hola desde el cliente con Socket.io');

socket.on('mensaje', (data) => {

    console.log(data);

});