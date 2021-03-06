import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { api_subscribeToBackendState } from './API';

const store = configureStore();

api_subscribeToBackendState(store)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
