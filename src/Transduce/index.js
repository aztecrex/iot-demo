import { isLampOn, lampColor, evtTypeLampPressed, evtLampStatus, evtLampStatusOff, coordinates, evtTypeLoginRequested, evtLoginFailed, matrixCoord, wheelCoord } from '../Model';


const transduce = getState => evt => {
    var emit = [];
    console.log(evt.type);
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
    } else if (evtTypeLoginRequested(evt)) {
        emit = [evtLoginFailed()];
    } else if (evt.type === "INIT_APP") {
        emit = [
            evtLampStatus(matrixCoord("matrix_0",1,7),"#ff0000"),
            evtLampStatus(matrixCoord("matrix_0",3,2),"#00ff00"),
            evtLampStatus(matrixCoord("matrix_0",1,4),"#0000ff"),
            evtLampStatus(matrixCoord("matrix_0",4,1),"#00ff00"),
            evtLampStatus(wheelCoord("colorwheel_0",3),"#00ff00"),
            evtLampStatus(wheelCoord("colorwheel_0",7),"#ff0000"),
            evtLampStatus(wheelCoord("colorwheel_0",11),"#0000ff"),
        ]
    }
    return Promise.resolve(emit);
};

const kick = ({dispatch}) => {
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
            .then(evts => evts.forEach(dispatch)).catch(err => console.log("interop error: " + err));
        return rval;
    };

};

export { transduce, makeMiddleware, kick };
