import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from './combinedReducers';

const middleware = applyMiddleware(thunk);

const Store = createStore(combinedReducers, middleware);

export default Store;
