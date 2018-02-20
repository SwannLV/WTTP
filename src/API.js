import openSocket from 'socket.io-client';
import { updatePipeline } from './actions/pipeline';

const socket = openSocket('http://localhost:8080');

socket.on('connect', function() {
    socket.emit('join', 'Hello World from client');
 });

function subscribeToBackendState(store) {    
    socket.on('change', function(state) {
        updatePipeline(state)(store.dispatch);
    });
}

export { subscribeToBackendState }