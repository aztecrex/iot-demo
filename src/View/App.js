import React from 'react';

import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';

import { ConnectedNavBar } from './NavBar';
import { ConnectedLogin, ConnectedPasswordChange } from './Login';

import './App.css';
import { Page1 } from './Page/Page1';

const theme1 = createMuiTheme({
    palette: {

        primary: {
            // main: '#ff4400',
            main: '#000000',
          },
        type: 'light',
    },
    typography: {
        fontFamily: [
            'Permanent Marker'
        ]
    }
});

const App = () => (
    <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme1}>
            <ConnectedLogin />
            <ConnectedPasswordChange />
            <ConnectedNavBar />
            <Page1 />
        </MuiThemeProvider>
    </React.Fragment>
);

export {App};
