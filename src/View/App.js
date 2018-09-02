import React from 'react';
import './App.css';
import { ConnectedNavBar } from './NavBar';
import { ConnectedLogin } from './Login';

const App = () => (
    <div>
        <ConnectedLogin />
        <ConnectedNavBar />
    </div>
);

export {App};




/* <div className="App">
<ConnectedWheel dim="100" device="colorwheel_0" />
<ConnectedWheel dim="150" device="colorwheel_1" />
<ConnectedWheel dim="200" device="colorwheel_2" />
<ConnectedWheel dim="250" device="colorwheel_3" />
<ConnectedMatrix dim = "250" device="matrix_0" />
</div> */
