import React from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
// import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// import MenuIcon from '@material-ui/icons/Menu'
import { evtLoginLoginDesired, isLoggedIn, evtLogoutRequested } from '../Model';


const styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flexGrow: 1,
    },
    // menuButton: {
    //   marginLeft: -12,
    //   marginRight: 20,
    // },
  };


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

const NavBar_ = ({classes, loggedIn, onLoginRequest = () => {}, onLogoutRequest = () => {}}) => {
    return (
    <React.Fragment>
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                {/* <IconButton color="inherit" aria-label="Menu" className={classes.menuButton} >
                    <MenuIcon />
                </IconButton> */}
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Internet of Things - A Little Presentation
                </Typography>
                <LoginControl
                    loggedIn={loggedIn}
                    onLoginRequest={onLoginRequest}
                    onLogoutRequest={onLogoutRequest} />
            </Toolbar>
        </AppBar>
    </React.Fragment>
    )
}

const NavBar = withStyles(styles)(NavBar_);

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


