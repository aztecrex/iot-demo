import React from 'react';
import './App.css';
import {ColorWheel} from './ColorWheel';
import {Matrix} from './Matrix';


const App = () => (
    <div className="App">
        <ColorWheel dim="100"/>
        <ColorWheel dim="150"/>
        <ColorWheel dim="200"/>
        <ColorWheel dim="250"/>
        <Matrix/>
    </div>
);

export {App};
