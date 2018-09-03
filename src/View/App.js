import React from 'react';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import { ConnectedNavBar } from './NavBar';
import { ConnectedLogin, ConnectedPasswordChange } from './Login';

import './App.css';
import { Page1 } from './Page/Page1';

const theme1 = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#ff4400',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
          },
    },
});

const App = () => (
    <MuiThemeProvider theme={theme1}>
        <ConnectedLogin />
        <ConnectedPasswordChange />
        <ConnectedNavBar />
        <Page1 />
    </MuiThemeProvider>
);

export {App};




/* <div className="App">
<ConnectedWheel dim="100" device="colorwheel_0" />
<ConnectedWheel dim="150" device="colorwheel_1" />
<ConnectedWheel dim="200" device="colorwheel_2" />
<ConnectedWheel dim="250" device="colorwheel_3" />
<ConnectedMatrix dim = "250" device="matrix_0" />
</div> */
