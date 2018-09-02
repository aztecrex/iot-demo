import React from 'react';
import './App.css';
import { ConnectedWheel } from './Wheel';
import { ConnectedMatrix } from './Matrix';


const App = () => (
    <div className="App">
        <ConnectedWheel dim="100" device="colorwheel_0" />
        <ConnectedWheel dim="150" device="colorwheel_1" />
        <ConnectedWheel dim="200" device="colorwheel_2" />
        <ConnectedWheel dim="250" device="colorwheel_3" />
        <ConnectedMatrix dim = "250" device="matrix_0" />
    </div>
);

export {App};
