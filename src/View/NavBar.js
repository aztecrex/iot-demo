import React, {Fragment} from 'react'
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import { evtLoginLoginDesired, isLoggedIn, evtLogoutRequested } from '../Model';


const LoginControl = ({loggedIn, onLoginRequest, onLogoutRequest}) => {
    if (!loggedIn) {
        return (
            <Button color="inherit" onClick={onLoginRequest} >Login</Button>
        );
    } else {
        return (
            <Button color="inherit" onClick={onLogoutRequest} >Logout</Button>
        );
    }
};

const NavBar = ({loggedIn, onLoginRequest = () => {}, onLogoutRequest = () => {}}) => {
    return (
    <Fragment>
        <AppBar position="static">
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit">
                    Internet of Things
                </Typography>
                <LoginControl
                    loggedIn={loggedIn}
                    onLoginRequest={onLoginRequest}
                    onLogoutRequest={onLogoutRequest} />
            </Toolbar>
        </AppBar>
    </Fragment>
    )
}

const ConnectedNavBar = connect (
    state => ({
        loggedIn: isLoggedIn(state)
    }),
    dispatch => ({
        onLoginRequest: () => dispatch(evtLoginLoginDesired()),
        onLogoutRequest: () => dispatch(evtLogoutRequested())
    })
)(NavBar);

export { NavBar, ConnectedNavBar };


