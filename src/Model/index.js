import * as R from 'ramda';


const navPre = "nAV";
const lampPre = "laMp";
const presPre = "PresENt";
const matPre = "mATRx";
const lanPre = "lanYd";

const ETP_LAMP_STATUS = lampPre + "/LAMP_STATUS";
const ETP_LAMP_PRESSED = lampPre + "/LAMP_CHANGE";

const ETP_LOGOUT_REQUESTED = navPre + "/LOGOUT_REQUESTED";
const ETP_LOGIN_REQUESTED = navPre + "/LOGIN_REQUESTED";
const ETP_LOGIN_SUCCEEDED = navPre + "/LOGIN_SUCCEEDED";
const ETP_LOGIN_FAILED = navPre + "/LOGIN_FAILED";
const ETP_LOGIN_DESIRED = navPre + "/LOGIN_DESIRED";
const ETP_LOGIN_CANCELED = navPre + "/LOGIN_CANCELED";
const ETP_PASSWORD_CHANGE_REQUIRED = navPre + "/PASSWORD_CHANGE_REQUIRED";
const ETP_PASSWORD_CHANGE_REQUESTED = navPre + "/PASSWORD_CHANGE_REQUESTED";
const ETP_PRESENTATION_CHANGED = presPre + "/PRESENTATION_CHANGED";
const ETP_MATRIX_POSITION_CHANGED = matPre + "/POSTION_CHANGED";
const ETP_LANYARD_PRESSED = lanPre + "/PRESSED";
const ETP_LANYARD_ANIMATION_CHANGED = lanPre + "/ANIMATION_CHANGED";

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

const device = coord => {
    return coord.device;
};

const index = coord => {
    if (coord.displayType === DT_WHEEL)
        return coord.index
    else
        return coord.row * 16 + coord.col;
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

const presentationKey = presPre + "/presentation"

const updatePresentationStatus = (m = {}, status) => {
    const cur = m[presentationKey] || {};
    return R.assoc(presentationKey, {...cur, ...status}, m);
}

const isPresenting = (m = {}) => ((m[presentationKey] || {}).presenting) || false;
const isPowered = (m = {}) => ((m[presentationKey] || {}).powered) || false;
const getSlideNumber = (m = {}) => {
    const v = ((m[presentationKey] || {}).slide) || 1;
    return v;
}


const evtPresentationChanged = status => {
    return {
        type: ETP_PRESENTATION_CHANGED,
        status: status
    };
};

const matrixPositionKey = matPre + "/position";

const evtMatrixPositionChanged = (x, y) => {
    return {
        type: ETP_MATRIX_POSITION_CHANGED,
        x, y,
    };
};

const updateMatrixPosition = (m = {}, x=0, y=0) => {
    return {...m, [matrixPositionKey]:{x,y}};
};

const getMatrixPosition = m => {
    return m[matrixPositionKey] || {x: 0,y: 0};
};


const evtLanyardPressed = () => {
    return { type: ETP_LANYARD_PRESSED };
}

const evtLanyardAnimationChanged = animation => {
    return {
            type: ETP_LANYARD_ANIMATION_CHANGED,
            animation
        };
};

const evtTypeLanyardPressed = (evt = {}) => evt.type === ETP_LANYARD_PRESSED;

const lanyardAnimationKey = lanPre + "/animation";

const getLanyardAnimation = (m = {}) => {
    return m[lanyardAnimationKey] || 0;
};

const updateLanyardAnimation = (m = {}, value) => {
    return {...m, [lanyardAnimationKey]: value || 0};
};


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

        case ETP_PRESENTATION_CHANGED: m = updatePresentationStatus(m, evt.status); break;

        case ETP_MATRIX_POSITION_CHANGED: m = updateMatrixPosition(m, evt.x, evt.y); break;

        case ETP_LANYARD_ANIMATION_CHANGED: m = updateLanyardAnimation(m, evt.animation); break;

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
    index, device,
    setLoginState, isLoggedIn, getLoginState,
    evtLoginRequested, evtLogoutRequested, evtLoginSucceeded, evtLoginFailed,
    evtLoginCanceled, evtLoginLoginDesired, evtPasswordChangeRequired, evtPasswordChangeRequested,
    evtTypeLoginRequested, evtTypeLogoutRequested, evtTypePasswordChangeRequested,
    evtTypeLoginSucceeded,
    getCurrentUser,
    LoginStates,
    credentials, user,
    isPresenting, isPowered, getSlideNumber,
    evtPresentationChanged,
    evtMatrixPositionChanged,
    updateMatrixPosition, getMatrixPosition,
    evtLanyardPressed, evtLanyardAnimationChanged,
    evtTypeLanyardPressed,
    getLanyardAnimation, updateLanyardAnimation,
};
