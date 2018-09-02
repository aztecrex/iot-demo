import { createStore, compose } from 'redux';

import { reduce } from './Model';


// this gets us the browser tools integration
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reduce, composeEnhancers());

export {
    store
};











