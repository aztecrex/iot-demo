import { isLampOn, evtTypeLampPressed, evtLampStatus, evtLampStatusOff, coordinates } from '../Model';


const transduce = getState => evt => {
    var emit = [];

    if (evtTypeLampPressed(evt)) {
        const coords = coordinates(evt);
        if (isLampOn(getState(), coords))
            emit = [evtLampStatusOff(coords)];
        else
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
