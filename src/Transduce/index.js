import { isLampOn, lampColor, evtTypeLampPressed, evtLampStatus, evtLampStatusOff, coordinates } from '../Model';


const transduce = getState => evt => {
    var emit = [];

    if (evtTypeLampPressed(evt)) {
        const coords = coordinates(evt);
        const state = getState();
        if (isLampOn(state, coords)) {
            const color = lampColor(state, coords);
            switch (color) {
                case "#ff0000": emit =[evtLampStatus(coords,"#00ff00")]; break;
                case "#00ff00": emit =[evtLampStatus(coords,"#0000ff")]; break;
                case "#0000ff": emit =[evtLampStatusOff(coords)]; break;
                default: emit =[evtLampStatusOff(coords)]; break;

            }
        } else
            emit = [evtLampStatus(coords, "#ff0000")];

    }
    return Promise.resolve(emit);
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
            .then(evts => evts.forEach(dispatch)).catch(err => console.log("interop error: " + err));
        return rval;
    };

};

export { transduce, makeMiddleware };
