import React from 'react';
import { connect } from 'react-redux';

import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';

import { ConnectedNavBar } from './NavBar';
import { ConnectedLogin, ConnectedPasswordChange } from './Login';

import './App.css';
import { HomePage } from './Page/HomePage';
import {  ConnectedSlides } from './Page/Slides';
import { isLoggedIn, isPresenting } from '../Model';

const theme1 = createMuiTheme({
    palette: {

        primary: {
            main: '#000000',
          },
        type: 'light',
    },
    // typography: {
    //     fontFamily: [
    //         'Permanent Marker'
    //     ]
    // }
});

const App = ({loggedIn = false, presenting = false}) => {
    if (loggedIn && presenting)
        return <ConnectedSlides />;
    else
        return (
        <React.Fragment>
            <CssBaseline />
            <MuiThemeProvider theme={theme1}>
                <ConnectedLogin />
                <ConnectedPasswordChange />
                <ConnectedNavBar />
                <HomePage />
            </MuiThemeProvider>
        </React.Fragment>);
};

const ConnectedApp = connect(
    state => ({
        loggedIn: isLoggedIn(state),
        presenting: isPresenting(state)
    }),
    dispatch => ({})
)(App);


export {App, ConnectedApp};
