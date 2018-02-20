import { 
  createStore,
  //  applyMiddleware, 
  //  compose 
} from 'redux';
// import thunk from 'redux-thunk';
// import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import initialState from './initialState'

// const middleware = [
//   thunk,
// ].filter(Boolean);

function configureStore() {
  const store = createStore(
    rootReducer, 
    initialState,
    // compose(
    //   applyMiddleware(...middleware),
    // )
);

  return store;
}

export default configureStore;