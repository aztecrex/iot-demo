import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Dialog, DialogTitle, DialogContent,DialogActions,
        Button, TextField } from '@material-ui/core';
import { getLoginState, LoginStates, evtLoginCanceled, evtLoginRequested, evtPasswordChangeRequested } from '../Model';

const initialState = {
    passwordValue: '',
    usernameValue: ''
};

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this._handlePasswordChange = this._handlePasswordChange.bind(this);
        this._handleUsernameChange = this._handleUsernameChange.bind(this);
        this._handleOK = this._handleOK.bind(this);
        this._handleCancel = this._handleCancel.bind(this);
    }

    _handlePasswordChange(e) {
        this.setState({...this.state, passwordValue: e.target.value});
    }

    _handleUsernameChange(e) {
        this.setState({...this.state, usernameValue: e.target.value});
    }

    _handleOK(xh) {
        const user = this.state.usernameValue;
        const pass = this.state.passwordValue;
        this.setState(initialState);
        if (xh) xh(user, pass);
    }

    _handleCancel(xh) {
        this.setState(initialState);
        if (xh) xh();
    }

    render() {
        const { open, handleOK, handleCancel} = this.props;
        return (
            <Dialog open={open}  onClose={handleCancel}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="user"
                    label="Username"
                    type="email"
                    fullWidth
                    value={this.state.usernameValue}
                    onChange={this._handleUsernameChange}
                />
                <TextField
                    margin="dense"
                    id="pass"
                    label="Password"
                    type="password"
                    fullWidth
                    value={this.state.passwordValue}
                    onChange={this._handlePasswordChange}
                />
                </DialogContent>
                <DialogActions>
                    <Button color="primary"
                            onClick={() => this._handleCancel(handleCancel)}>
                        Cancel
                    </Button>
                    <Button color="primary"
                            onClick={() => this._handleOK(handleOK)}>
                        OK
                    </Button>
                </DialogActions>
        </Dialog>
        );

    }

}

// Note this is not a general password change. It is used when
// the authentication system tells us the user is being forced
// to change the password.
class PasswordChange extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this._handlePasswordChange = this._handlePasswordChange.bind(this);
        this._handleOK = this._handleOK.bind(this);
        this._handleCancel = this._handleCancel.bind(this);
    }

    _handlePasswordChange(e) {
        this.setState({...this.state, passwordValue: e.target.value});
    }

    _handleOK(xh) {
        const pass = this.state.passwordValue;
        this.setState(initialState);
        if (xh) xh(pass);
    }

    _handleCancel(xh) {
        this.setState(initialState);
        if (xh) xh();
    }

    render() {
        const {open, handleOK, handleCancel} = this.props;
        return (
            <Dialog open={open} onClose={handleCancel}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                <TextField
                    margin="dense"
                    id="pass"
                    label="Password"
                    type="password"
                    fullWidth
                    value={this.state.passwordValue}
                    onChange={this._handlePasswordChange}
                />
                </DialogContent>
                <DialogActions>
                    <Button color="primary"
                            onClick={() => this._handleCancel(handleCancel)}>
                        Cancel
                    </Button>
                    <Button color="primary"
                            onClick={() => this._handleOK(handleOK)}>
                        OK
                    </Button>
                </DialogActions>
        </Dialog>
        );
    }
}


const ConnectedLogin = connect(
    state => ({
        open: getLoginState(state) === LoginStates.LOGGING_IN
    }),
    dispatch => ({
        handleOK: (user, pass) => dispatch(evtLoginRequested(user,pass)),
        handleCancel: () => dispatch(evtLoginCanceled())
    })
)(Login);


const ConnectedPasswordChange = connect(
    state => ({
        open: getLoginState(state) === LoginStates.PASSWORD_CHANGE
    }),
    dispatch => ({
        handleOK: (pass) => dispatch(evtPasswordChangeRequested(pass)),
        handleCancel: () => dispatch(evtLoginCanceled())
    })
)(PasswordChange);

export {
    Login,
    ConnectedLogin,
    PasswordChange,
    ConnectedPasswordChange
};

