import React from 'react';
import './App.css';
import {Wheel} from './Wheel';
import {Matrix} from './Matrix';


const App = () => (
    <div className="App">
        <Wheel dim="100"/>
        <Wheel dim="150"/>
        <Wheel dim="200"/>
        <Wheel dim="250"/>
        <Matrix/>
    </div>
);

export {App};
