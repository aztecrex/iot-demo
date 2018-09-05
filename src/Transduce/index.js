import * as R from 'ramda';

import {Login, currentUser, Logout, ChangePass} from '../AWS/Authenticate';
import { isLampOn, lampColor, evtTypeLampPressed, evtLampStatus, evtLampStatusOff, coordinates, evtTypeLoginRequested, evtLoginFailed, matrixCoord, wheelCoord, evtLoginSucceeded, credentials, evtTypeLogoutRequested, evtPasswordChangeRequired, evtTypePasswordChangeRequested, getCurrentUser, evtTypeLoginSucceeded, evtPresentationChanged } from '../Model';
import { bringUp, bringDown } from '../AWS/IoT';


const transduce = getState => evt => {
    var emit = [];
    if (evtTypeLampPressed(evt)) {
        const coords = coordinates(evt);
        const state = getState();
        if (isLampOn(state, coords)) {
            const color = lampColor(state, coords);
            switch (color) {
                case "#ff0000": emit =[Promise.resolve(evtLampStatus(coords,"#00ff00"))]; break;
                case "#00ff00": emit =[Promise.resolve(evtLampStatus(coords,"#0000ff"))]; break;
                case "#0000ff": emit =[Promise.resolve(evtLampStatusOff(coords))]; break;
                default: emit =[Promise.resolve(evtLampStatusOff(coords))]; break;

            }
        } else
            emit = [Promise.resolve(evtLampStatus(coords, "#ff0000"))];
    } else if (evtTypeLoginRequested(evt)) {
        const {user,pass} = credentials(evt);
        emit = [
            Login(user,pass)
                .then(user => {
                    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        return evtPasswordChangeRequired(user);
                    } else {
                        return evtLoginSucceeded(user);
                    }
                })
                .catch(() => evtLoginFailed())
        ]
    } else if (evtTypeLogoutRequested(evt)) {
        bringDown();
        Logout();
    } else if (evtTypeLoginSucceeded(evt)) {
        bringUp(IoTHandler).then(console.log).catch(console.error);
    } else if (evtTypePasswordChangeRequested(evt)) {
        const {pass} = credentials(evt);
        const user = getCurrentUser(getState());
        return ChangePass(user, pass)
            .then(u => evtLoginSucceeded(u))
            .catch(() => evtPasswordChangeRequired(user))
    } else if (evt.type === "INIT_APP") {
        emit = [
            currentUser()
                .then(user => evtLoginSucceeded(user))
                .catch(() => evtLoginFailed()),
        Promise.resolve(evtLampStatus(matrixCoord("matrix_0",1,7),"#ff0000")),
            Promise.resolve(evtLampStatus(matrixCoord("matrix_0",3,2),"#00ff00")),
            Promise.resolve(evtLampStatus(matrixCoord("matrix_0",1,4),"#0000ff")),
            Promise.resolve(evtLampStatus(matrixCoord("matrix_0",4,1),"#00ff00")),
            Promise.resolve(evtLampStatus(wheelCoord("colorwheel_0",3),"#00ff00")),
            Promise.resolve(evtLampStatus(wheelCoord("colorwheel_0",7),"#ff0000")),
            Promise.resolve(evtLampStatus(wheelCoord("colorwheel_0",11),"#0000ff")),
            Promise.resolve(evtPresentationChanged({presenting: false,powered: false, slide: 1})),
        ];
    }
    return emit;
};

var IoTHandler = d => console.log(d);

const makeIoTHandler = dispatch => {

    return d => {
        console.log("GOT IOT EVENT: ", d);
        if (d.type === "STATUS" || d.type === "FOREIGN") {
            if (d.name === "SBHS_Presentation") {
                const sup = R.path(['obj','state','desired'],d) || {};
                console.log(sup);
                dispatch(evtPresentationChanged(sup));
            }
        }
    };
};

const kick = ({dispatch}) => {
    IoTHandler = makeIoTHandler(dispatch);
    dispatch({type: "INIT_APP"});
};

const makeMiddleware = () => ({dispatch, getState}) => next => {

    const run = transduce(getState);

    return event => {
        // this middleware guarantees the event has been applied to the store before
        // run is invoked. Thus next must be run before intercept. The result from
        // next is captured so it can be returned from this function as required by the
        // redux middleware protocol.
        const rval = next(event);
        run(event)
            .forEach(pev => {
                pev
                    .then(dispatch)
                    .catch(err => console.log("interop error: " + err));
            });

        //     .then(evts => evts.forEach(dispatch)).catch(err => console.log("interop error: " + err));
        return rval;
    };

};

export { transduce, makeMiddleware, kick };
