import openSocket from 'socket.io-client';
import { action_updatePipelineFromBackend } from './actions/pipeline';

const socket = openSocket('http://localhost:8080');

socket.on('connect', function() {
    socket.emit('join', 'Hello World from client');
 });

 socket.on('canceled_change', function(data) {
    alert(`${data.title}\n\n${data.message}`)
 });

function api_subscribeToBackendState(store) {    
    socket.on('change', function(state) {        
        action_updatePipelineFromBackend(state)(store.dispatch);
    });
}

function api_postChangeToBackendState(store) {    
    socket.emit('change', store);
}

export { 
    api_subscribeToBackendState,
    api_postChangeToBackendState
}