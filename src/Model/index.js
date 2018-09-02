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

const turnLampOn = (m = {}, coord, color) => {
    const key = lampPre + lampId(coord);
    return R.assoc(key, color, m);
};

const evtLampStatus = (coord, status) => {
    return {type:ETP_LAMP_STATUS, ...coord, status};
}

const evtLampPressed = (coord) => {
    return {type:ETP_LAMP_PRESSED, ...coord};
}

const turnLampOff = (m = {}, coord) => {
    const key = lampPre + lampId(coord);
    return R.dissoc(key, m);
};

const reduce = (m = {}, evt = {}) => {

    switch (evt.type) {
        case ETP_LAMP_STATUS:
            if ((!evt.status) || (evt.status === "off"))
                return turnLampOff(m, evt);
            else
                return turnLampOn(m, evt, evt.status)
        default:
            break;
    }

};

export {
    reduce,
    turnLampOn, turnLampOff,
    evtLampStatus,
    evtLampPressed
};
