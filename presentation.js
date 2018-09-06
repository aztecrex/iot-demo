const IoTData = require('aws-sdk/clients/iotdata');
const R = require('ramda');

const Data = new IoTData({
    region: 'us-east-1',
    endpoint: process.env.IOT_ENDPOINT
});

const NumSlides = 8;

const ThingName = process.env.IOT_THING;  // only one for now

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
    await updateDesired({slide: Math.min(NumSlides, current + 1)});
};

const retreat = async () => {
    const curDesired = await fetchDesired()
        .catch(err => {console.log(err); return {}});
    const current = curDesired.slide || 1;
    console.log(current);
    updateDesired({slide: Math.max(1, current - 1)});
};

const togglePresentation = async () => {
    const curDesired = await fetchDesired()
        .catch(err => {console.log(err); return {}});
    const current = curDesired.presenting || false;
    updateDesired({presenting: !current});
};


// here's what the message from the button looks like
// {
//     "serialNumber": "GXXXXXXXXXXXXXXXXX",
//     "batteryVoltage": "xxmV",
//     "clickType": "SINGLE" | "DOUBLE" | "LONG"
// }

const SINGLE="SINGLE";
const DOUBLE="DOUBLE";
const LONG="LONG";
const UNKNOWN = "unknown";


const eventAction = (evt = {}) => {
    return evt.clickType || UNKNOWN;
};

const dispatch = action => {
    switch (action) {
        case SINGLE:    return advance();
        case DOUBLE:    return retreat();
        case LONG:      return togglePresentation();
        default:        return Promise.resolve({});
    }

};

const handle = async (event, context, callback) => {

    await dispatch(eventAction(event))
            .catch(console.error);
    callback(null,{});

};

module.exports.handle=handle;
