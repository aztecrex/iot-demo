import React from 'react';
import './App.css';
import {Wheel} from './Wheel';
import {Matrix} from './Matrix';


const App = () => (
    <div className="App">
        <Wheel dim="100" device="colorwheel_0" handleDotClicked={v => console.log(v)}/>
        <Wheel dim="150" device="colorwheel_1" handleDotClicked={v => console.log(v)}/>
        <Wheel dim="200" device="colorwheel_2" handleDotClicked={v => console.log(v)}/>
        <Wheel dim="250" device="colorwheel_3" handleDotClicked={v => console.log(v)}/>
        <Matrix dim = "250" device="matrix_0" handleDotClicked={v => console.log(v)}/>
    </div>
);

export {App};
