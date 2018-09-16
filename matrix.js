const IoTData = require('aws-sdk/clients/iotdata');
const R = require('ramda');

const Data = new IoTData({
    region: 'us-east-1',
    endpoint: process.env.IOT_ENDPOINT
});


const Thing = process.env.IOT_THING;


const updateDesired = position => {
    const payload = {state: {desired: {position}}};
    return new Promise((resolve, reject) => {
        Data.updateThingShadow({
            thingName: Thing,
            payload: JSON.stringify(payload)
        }, (err, data) => {
            if (err) reject(err);
            else resolve({});
        });
    });
};

const dispatch = position => {
    if (position)
        return updateDesired(position);
    else return Promise.reject(e => "no position");
};

const eventAction = event => {
    return event;
};

const handle = async (event, context, callback) => {
    console.log("EVENT", JSON.stringify(event));
    await dispatch(eventAction(event))
            .catch(console.error);
    callback(null,{});
};

module.exports.handle=handle;
