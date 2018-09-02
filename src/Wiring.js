import { createStore, compose, applyMiddleware } from 'redux';

import { reduce } from './Model';
import { makeMiddleware } from './Transduce';

// this gets us the browser tools integration
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = applyMiddleware(
    makeMiddleware()
);



const store = createStore(reduce, composeEnhancers(middleware));

export {
    store
};











