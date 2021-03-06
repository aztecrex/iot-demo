import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const fakeReduce = (m={}) => m;
const store = createStore(fakeReduce);
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
