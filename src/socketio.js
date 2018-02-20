import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');

socket.on('connect', function(data) {
    debugger
    socket.emit('join', 'Hello World from client');
 });
 socket.on('broad', function(data) {
    debugger
});
socket.on('change', function(data) {
    debugger
});