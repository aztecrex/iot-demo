import * as R from 'ramda';

import {Login, currentUser, Logout, ChangePass} from '../AWS/Authenticate';
import { isLampOn, lampColor, evtTypeLampPressed, evtLampStatus, evtLampStatusOff, coordinates, evtTypeLoginRequested, evtLoginFailed, matrixCoord, wheelCoord, evtLoginSucceeded, credentials, evtTypeLogoutRequested, evtPasswordChangeRequired, evtTypePasswordChangeRequested, getCurrentUser, evtTypeLoginSucceeded, evtPresentationChanged, index, device } from '../Model';
import { bringUp, bringDown, setLampColor } from '../AWS/IoT';


const transduce = getState => evt => {
    var emit = [];
    if (evtTypeLampPressed(evt)) {
        const coords = coordinates(evt);
        const state = getState();
        var nextColor;
        if (isLampOn(state, coords)) {
            const color = lampColor(state, coords);
            switch (color) {
                case "#ff0000": nextColor = "#00ff00"; break;
                case "#00ff00": nextColor = "#0000ff"; break;
                case "#0000ff": nextColor = null; break;
                default: nextColor = null; break;
            }
        } else {
            nextColor = "#ff0000";
        }
        var nextColorI = 0;
        if (nextColor) {
            emit = [Promise.resolve(evtLampStatus(coords, nextColor))];
            nextColorI = parseInt(nextColor.substr(1),16);
        } else {
            emit = [Promise.resolve(evtLampStatusOff(coords))];
            nextColorI = 0;
        }
        const dev = device(coords);
        const key = "lamp_" + index(coords);
        setLampColor(dev, key, nextColorI);
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
            Promise.resolve(evtLampStatus(wheelCoord("Ring0",3),"#00ff00")),
            Promise.resolve(evtLampStatus(wheelCoord("Ring0",7),"#ff0000")),
            Promise.resolve(evtLampStatus(wheelCoord("Ring0",11),"#0000ff")),
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
            if (d.name === "Presentation") {
                const sup = R.path(['obj','state','desired'],d) || {};
                console.log(sup);
                dispatch(evtPresentationChanged(sup));
            } else if (d.name === "Ring0" || d.name === "Ring1") {
                const sup = R.path(['obj','state','desired'], d) || {};
                console.log(JSON.stringify(sup));
                const lampChanges = R.pickBy((_,k) => k.startsWith("lamp_"), sup);
                R.forEachObjIndexed((v, k) => {
                    const index = parseInt(k.split("_")[1],10);
                    const coord = wheelCoord(d.name, index);
                    if (v > 0 && v < 16777216) {
                        const color = "#" + ("000000" + v.toString(16)).slice(-6);
                        dispatch(evtLampStatus(coord, color));
                    } else {
                        dispatch(evtLampStatusOff(coord));
                    }
                }, lampChanges);
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
