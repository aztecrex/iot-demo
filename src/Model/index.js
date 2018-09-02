import * as R from 'ramda';


const lampPre = "laMp_";

const ETP_LAMP_STATUS = lampPre + "LAMP_STATUS";
const ETP_LAMP_PRESSED = lampPre + "LAMP_CHANGE";

const DT_MATRIX = "Matrix";
const DT_WHEEL = "Wheel";

const lampId = ({displayType, device, row, col, index}) => {
    switch (displayType) {
        case DT_MATRIX:
            return `${displayType}_${device}_${row}_${col}`
        case DT_WHEEL:
            return `${displayType}_${device}_${index}`
        default:
            return `${displayType}_${device}`;

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
    const key = lampPre + lampId(coord);
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

const isLampOn = (m, coord) => {
    const key = lampPre + lampId(coord);
    return !!m[key];
};

const lampColor = (m, coord) => {
    const key = lampPre + lampId(coord);
    return m[key] || undefined;
}

const turnLampOff = (m = {}, coord) => {
    const key = lampPre + lampId(coord);
    return R.dissoc(key, m);
};

const coordinates = ({coord}) => {
    return coord || {};
};

const reduce = (m = {}, evt = {}) => {

    switch (evt.type) {
        case ETP_LAMP_STATUS:
            if (!evt.status)
                return turnLampOff(m, evt.coord);
            else
                return turnLampOn(m, evt.coord, evt.status)
        default:
            break;
    }
    return m;

};

export {
    reduce,
    turnLampOn, turnLampOff,
    evtLampStatus, evtLampStatusOff, isLampOn, lampColor,
    evtLampPressed, evtTypeLampPressed,
    coordinates, wheelCoord, matrixCoord
};
