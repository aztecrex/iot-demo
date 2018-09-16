const IoTData = require('aws-sdk/clients/iotdata');
const R = require('ramda');

const Data = new IoTData({
    region: 'us-east-1',
    endpoint: process.env.IOT_ENDPOINT
});


const Things = [
    process.env.IOT_THING_RING0,
    process.env.IOT_THING_RING1,
    process.env.IOT_THING_LANYARD,
    process.env.IOT_THING_PRESENTATION,
];

const updateDesired = (thing, powered) => {
    const payload = {state: {desired: {powered}}};
    return new Promise((resolve, reject) => {
        Data.updateThingShadow({
            thingName: thing,
            payload: JSON.stringify(payload)
        }, (err, data) => {
            if (err) reject(err);
            else resolve({});
        });
    });
};

const dispatch = powered => {
    const updates = Things.map(t => {
        updateDesired(t, powered);
    });
    return Promise.all(updates);
};

const eventAction = event => {
    return !!(((event.state || {}).reported || {}).switch);
};

const handle = async (event, context, callback) => {
    console.log("EVENT", JSON.stringify(event));
    await dispatch(eventAction(event))
            .catch(console.error);
    callback(null,{});
};

module.exports.handle=handle;
