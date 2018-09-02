import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Dialog, DialogTitle, DialogContent,DialogActions,
        Button, TextField } from '@material-ui/core';
import { getLoginState, LoginStates, evtLoginCanceled, evtLoginRequested } from '../Model';


// var Content = React.createClass({

//     getInitialState: function() {
//         return {
//             textFieldValue: ''
//         };
//     },

//     _handleTextFieldChange: function(e) {
//         this.setState({
//             textFieldValue: e.target.value
//         });
//     },

//     render: function() {
//         return (
//             <div>
//                 <TextField value={this.state.textFieldValue} onChange={this._handleTextFieldChange} />
//             </div>
//         )
//     }

// });

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
        const {open, handleOK, handleCancel} = this.props;
        return (
            <Dialog open={open} onClose={handleCancel}>
                <DialogTitle>Super Secret Password</DialogTitle>
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

const ConnectedLogin = connect(
    state => ({
        open: getLoginState(state) === LoginStates.LOGGING_IN
    }),
    dispatch => ({
        handleOK: (user, pass) => dispatch(evtLoginRequested(user,pass)),
        handleCancel: () => dispatch(evtLoginCanceled())
    })
)(Login);

export {Login, ConnectedLogin};

