import React from 'react';
import './App.css';
import {ColorWheel} from './ColorWheel';
import {Matrix} from './Matrix';


const App = () => (
    <div className="App">
        <ColorWheel/>
        <ColorWheel/>
        <ColorWheel/>
        <ColorWheel/>
        <Matrix/>
    </div>
);

export {App};
