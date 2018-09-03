import IOT from 'aws-iot-device-sdk';

const createDevice = (credentials, cb) => {
    const thing = 'Demo';
    var registered = false;
    const shadow = IOT.thingShadow({
        region: 'us-east-1',
        protocol: 'wss',
        clientId: 'iot-demo' + Math.random(10000000),
        maximumReconnectTimeMs: 8000,
        debug: true,
        accessKeyId: credentials.AccessKeyId,
        secretKey: credentials.SecretKey,
        sessionToken: credentials.SessionToken
    });
    shadow.on('connect', () => {
        console.log("connected");
        if (!registered) {
            shadow.register(thing, {
                persistentSubscribe: true
            });
            console.log("registered");
            registered = true;
        }
    });
    shadow.on('reconnect', function () {
        console.log("reconnect")
    });
    shadow.on('delta', function (name, stateObj) {
        console.log("DELTA: " + JSON.stringify(stateObj));
        console.log("DELTA UPDATE" + JSON.stringify(update));
    });
    shadow.on('status', function (name, type, token, stateObj) {
        console.log("STATUS: " + JSON.stringify(stateObj));
        console.log("STATUS UPDATE" + JSON.stringify(update));
    });
    setTimeout( function () {
        const code = shadow.get(thing);
        // console.log("GET CODE:" + code);
    }, 1000);
};


export { createDevice };

