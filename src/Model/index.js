import * as R from 'ramda';


const navPre = "nAV";
const lampPre = "laMp";

const ETP_LAMP_STATUS = lampPre + "/LAMP_STATUS";
const ETP_LAMP_PRESSED = lampPre + "/LAMP_CHANGE";

const ETP_LOGOUT_REQUESTED = navPre + "/LOGOUT_REQUESTED";
const ETP_LOGIN_REQUESTED = navPre + "/LOGIN_REQUESTED";
const ETP_LOGIN_SUCCEEDED = navPre + "/LOGIN_SUCCEEDED";
const ETP_LOGIN_FAILED = navPre + "/LOGIN_FAILED";
const ETP_LOGIN_DESIRED = navPre + "/LOGIN_DESIRED";
const ETP_LOGIN_CANCELED = navPre + "/LOGIN_CANCELED";
const ETP_PASSWORD_CHANGE_REQUIRED = navPre + "/PASSWORD_CHANGE_REQUIRED"
const ETP_PASSWORD_CHANGE_REQUESTED = navPre + "/PASSWORD_CHANGE_REQUESTED"


const DT_MATRIX = "Matrix";
const DT_WHEEL = "Wheel";


const lampKey = ({displayType, device, row, col, index}) => {
    switch (displayType) {
        case DT_MATRIX:
            return `${lampPre}/${device}/${displayType}/${row}/${col}`
        case DT_WHEEL:
            return `${lampPre}/${device}/${displayType}/${index}`
        default:
            return `${lampPre}/${device}/${displayType}`;

    }
};

const matrixCoord = (device, row,col) => {
    return {
        displayType: DT_MATRIX,
        device,
        row,
        col
    };
}

const wheelCoord = (device, index) => {
    return {
        displayType: DT_WHEEL,
        device,
        index
    };
}


const turnLampOn = (m = {}, coord, color) => {
    const key = lampKey(coord);
    return R.assoc(key, color, m);
};

const evtLampStatus = (coord, color) => {
    return {type:ETP_LAMP_STATUS, coord, status: color};
}

const evtLampStatusOff = (coord) => {
    return {type:ETP_LAMP_STATUS, coord};
}

const evtLampPressed = (coord) => {
    return {type:ETP_LAMP_PRESSED, coord};
}

const evtTypeLampPressed = (evt = {}) => {
    return evt.type === ETP_LAMP_PRESSED;
};

const isLampOn = (m = {}, coord) => {
    const key = lampKey(coord);
    return !!m[key];
};

const lampColor = (m = {}, coord) => {
    const key = lampKey(coord);
    return m[key] || undefined;
}

const turnLampOff = (m = {}, coord) => {
    const key = lampKey(coord);
    return R.dissoc(key, m);
};

const coordinates = ({coord}) => {
    return coord || {};
};

const NAV_LOGGED_IN = navPre + "/LOGGEDIN";
const NAV_LOGGED_OUT = navPre + "/LOGGEDOUT";
const NAV_LOGGING_IN = navPre + "/LOGGINGIN";
const NAV_PASSWORD_CHANGE = navPre + "/PASSCHANGE";
const NAV_AWAITING_LOGIN_RESULT = navPre + "/LOGINWAIT"
const loginKey = navPre + "/login";
const loginUserKey = navPre + "/login/user";

const setLoginState = (m = {}, st) => {
    return R.assoc(loginKey, st, m);
};

const setLoginUser = ( m = {}, u) => {
    console.log("here");
    return R.assoc(loginUserKey, u, m);
};

const getLoginState = (m = {}) => {
    return m[loginKey] || NAV_LOGGED_OUT;
};

const isLoggedIn = (m = {}) => {
    return m[loginKey] === NAV_LOGGED_IN;
};

const getCurrentUser = (m = {}) => {
    return m[loginUserKey] || {};
};

const credentials = ({credentials}) => credentials || {};

const user = ({user}) => user | {};

const evtLoginRequested = (user, pass) => {
    return {
        type:ETP_LOGIN_REQUESTED,
        credentials: {user, pass}
    };
};

const evtLogoutRequested = () => {
    return {
        type:ETP_LOGOUT_REQUESTED
    };
};

const evtLoginSucceeded = (user) => {
    return {
        type:ETP_LOGIN_SUCCEEDED,
        user
        };
};

const evtLoginFailed = () => {
    return {type:ETP_LOGIN_FAILED};
};

const evtLoginLoginDesired = () => {
    return {type:ETP_LOGIN_DESIRED};
};

const evtLoginCanceled = () => {
    return {type:ETP_LOGIN_CANCELED};
};


const evtPasswordChangeRequested = pass => {
    return {
        type:ETP_PASSWORD_CHANGE_REQUESTED,
        credentials: {pass}
    };
};

const evtPasswordChangeRequired = user => {
    return {
        type:ETP_PASSWORD_CHANGE_REQUIRED,
        user
    };
};
const evtTypeLoginRequested = (evt = {}) => {
    return evt.type === ETP_LOGIN_REQUESTED;
};

const evtTypeLogoutRequested = (evt = {}) => {
    return evt.type === ETP_LOGOUT_REQUESTED;
};

const evtTypeLoginSucceeded = ({type}) => type === ETP_LOGIN_SUCCEEDED;

const evtTypePasswordChangeRequested = ({type}) => type === ETP_PASSWORD_CHANGE_REQUESTED;

const colors = (m, device) => {
    const keys = R.filter(s => s.startsWith(`${lampPre}/${device}/`), R.keys(m))
    const kcs = R.map(key => {
        const parts = key.split("/");
        const color = m[key];
        var rval = {};
        if (parts[2] === DT_MATRIX)
            rval = {
                device,
                displayType: DT_MATRIX,
                row: parseInt(parts[3], 10),
                col: parseInt(parts[4], 10),
                color};
        else if (parts[2] === DT_WHEEL) {
            rval = {
                device,
                displayType: DT_MATRIX,
                index: parseInt(parts[3], 10),
                color};
        }
        return rval;
    }, keys);
    return kcs;
};

const reduce = (m = {}, evt = {}) => {

    switch (evt.type) {
        case ETP_LAMP_STATUS:
            if (!evt.status)
                m = turnLampOff(m, evt.coord);
            else
                m = turnLampOn(m, evt.coord, evt.status);
            break;

        case ETP_LOGIN_SUCCEEDED:
            m = setLoginState(m, NAV_LOGGED_IN);
            m = setLoginUser(m, evt.user);
            break;
        case ETP_LOGIN_FAILED: m = setLoginState(m, NAV_LOGGED_OUT); break;
        case ETP_LOGIN_DESIRED: m = setLoginState(m, NAV_LOGGING_IN); break;
        case ETP_LOGIN_REQUESTED: m = setLoginState(m, NAV_AWAITING_LOGIN_RESULT); break;
        case ETP_LOGIN_CANCELED: m = setLoginState(m, NAV_LOGGED_OUT); break;
        case ETP_LOGOUT_REQUESTED: m = setLoginState(m, NAV_LOGGED_OUT); break;
        case ETP_PASSWORD_CHANGE_REQUIRED:
            m = setLoginState(m, NAV_PASSWORD_CHANGE);
            m = setLoginUser(m, evt.user);
            break;

        default:
            break;
    }

    return m;

};

const LoginStates = {
    LOGGED_IN: NAV_LOGGED_IN,
    LOGGED_OUT: NAV_LOGGED_OUT,
    LOGGING_IN: NAV_LOGGING_IN,
    PASSWORD_CHANGE: NAV_PASSWORD_CHANGE,
    WAITING: NAV_AWAITING_LOGIN_RESULT
}


export {
    reduce,
    turnLampOn, turnLampOff,
    evtLampStatus, evtLampStatusOff, isLampOn, lampColor,
    evtLampPressed, evtTypeLampPressed,
    coordinates, wheelCoord, matrixCoord,
    colors,
    setLoginState, isLoggedIn, getLoginState,
    evtLoginRequested, evtLogoutRequested, evtLoginSucceeded, evtLoginFailed,
    evtLoginCanceled, evtLoginLoginDesired, evtPasswordChangeRequired, evtPasswordChangeRequested,
    evtTypeLoginRequested, evtTypeLogoutRequested, evtTypePasswordChangeRequested,
    evtTypeLoginSucceeded,
    getCurrentUser,
    LoginStates,
    credentials, user
};
