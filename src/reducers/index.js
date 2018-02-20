import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import pipeline from './pipeline';


const rootReducer = combineReducers({
//   routing: routerReducer,
  pipeline,
});

export default rootReducer;