import * as R from 'ramda';


const lampPre = "laMp";

const ETP_LAMP_STATUS = lampPre + "LAMP_STATUS";
const ETP_LAMP_PRESSED = lampPre + "LAMP_CHANGE";

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

const isLampOn = (m, coord) => {
    const key = lampKey(coord);
    return !!m[key];
};

const lampColor = (m, coord) => {
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
    coordinates, wheelCoord, matrixCoord,
    colors
};
