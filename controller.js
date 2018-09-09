const IoTData = require('aws-sdk/clients/iotdata');
const R = require('ramda');

const Data = new IoTData({
    region: 'us-east-1',
    endpoint: process.env.IOT_ENDPOINT
});

const NumSlides = 8;

const ThingName = process.env.IOT_THING;

const fetchDesired = async () => {
    const result = await new Promise ((resolve, reject) => {
        Data.getThingShadow({
            thingName: ThingName
        }, (err, data) => {
            console.log(data);
            if (err) reject(err);
            else resolve(data);
        });
    });
    return R.path(["state","desired"], JSON.parse(result.payload));
};

const updateDesired = v => {
    const payload = {state: {desired: v}};
    return new Promise((resolve, reject) => {
        Data.updateThingShadow({
            thingName: ThingName,
            payload: JSON.stringify(payload)
        }, (err, data) => {
            if (err) reject(err);
            else resolve({});
        });
    });
};

const advance = async () => {
    const curDesired = await fetchDesired()
        .catch(err => {console.log(err); return {}});
    const current = curDesired.slide || 1;
    console.log(current);
    return await updateDesired({slide: Math.min(NumSlides, current + 1)});
};

const retreat = async () => {
    const curDesired = await fetchDesired()
        .catch(err => {console.log(err); return {}});
    const current = curDesired.slide || 1;
    console.log(current);
    return await updateDesired({slide: Math.max(1, current - 1)});
};

const show = () => {
    return updateDesired({presenting: true});
};

const hide = () => {
    return updateDesired({presenting: false});
};

const first = () => {
    return updateDesired({slide: 1});
};

const last = () => {
    return updateDesired({slide: NumSlides});
};

const reset = () => {
    return updateDesired({slide: 1, presenting: false});
}

const powerOn = () => {
    return updateDesired({powered: true});
};

const powerOff = () => {
    return updateDesired({powered: false});
};

const toggleDetails = async () => {
    const curDesired = await fetchDesired()
        .catch(err => {console.log(err); return {}});
    const current = !!(curDesired.details || false);
    console.log("current details", current);
    return await updateDesired({details: !current});
};

const eventAction = (evt = {}) => {
    return evt.action || "unknown";
};

const dispatch = action => {
    switch (action) {
        case "next":         return advance();
        case "previous":         return retreat();
        case "first":           return first();
        case "last":            return last();
        case "reset":           return reset();
        case "power-on":        return powerOn();
        case "power-off":       return powerOff();
        case "hide":            return hide();
        case "show":            return show();
        case "toggle-details":  return toggleDetails();
        default:                return Promise.resolve({});
    }

};

const handle = async (event, context, callback) => {
    console.log("EVENT", JSON.stringify(event));
    await dispatch(eventAction(event))
            .catch(console.error);
    callback(null,{});

};

module.exports.handle=handle;
