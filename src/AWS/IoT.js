import * as R from 'ramda';
import IOT from 'aws-iot-device-sdk';
import { awsCredentials } from './Authenticate';

const clientId = () =>
    awsCredentials()
        .then(c => c.identityId);

const PRES_THING = 'Presentation';
const RING_THING_0 = 'Ring0';

const Things = [
    PRES_THING,
    RING_THING_0
];

const register = (client, thing) => {
    const opts = {persistentSubscribe: true};
    return new Promise((resolve, reject) => {
        client.register(thing, opts, () => {
            resolve({});
        });
    });
};

const dismiss = (client) => {
    return new Promise((resolve, reject) => {
        client.end(() => {
            resolve({});
        });
    });
};

const Thing = (() => {
    var client = null;
    const up = (cb) => {
        if (client) {
            down();
        }
        client = createClient(cb);
    };
    const down = () => {
        if (client) {
            const tmp = client;
            client = null;
            return tmp.then(dismiss);
        }
        return true;
    };

    return {up, down};


})();

const createClient = async (name) => {

    const cid = await clientId();
    const cred = await awsCredentials();

    const client = IOT.thingShadow({
        region: 'us-east-1',
        protocol: 'wss',
        host: 'ad78o9k6p57sk.iot.us-east-1.amazonaws.com',
        clientId: cid + "-" + (new Date().getTime()),
        maximumReconnectTimeMs: 8000,
        debug: true,
        accessKeyId: cred.accessKeyId,
        secretKey: cred.secretAccessKey,
        sessionToken: cred.sessionToken
    });
    client.on('connect', async () => {
        console.log("client is connected");
        await Promise.all(R.map(thing => register(client,thing), Things))
            .catch(error => console.log("Error registering", error));
        console.log("things are registered");
        Things.forEach(thing => client.get(thing));
        console.log("things are kicked");
    });
    client.on('reconnect', () => {
        console.log("client is reconnect")
    });
    client.on('delta', function (name, stateObj) {
        console.log(name, "DELTA: " + JSON.stringify(stateObj));
    });
    client.on('status', function (name, type, token, stateObj) {
        console.log(name, type, token, "STATUS: " + JSON.stringify(stateObj));
    });
    client.on('foreignStateChange', (name, op, obj) => {
        console.log(name, op, obj, "foreign state change");
    });
    client.on('close', () => {
        console.log("client closed");
    });
    client.on('offline', () => {
        console.log("client offline");
    });
    client.on('end', () => {
        console.log("client end");
    });
    client.on('error', (error) => {
        console.log("client error", error);
    });

    const setRefresh = millis => {
        console.log("next credential refresh minutes: " + millis / 60000)
        setTimeout(async () => {
            console.log("refresh credentials");
            const newCreds = await awsCredentials().catch(() => {
                return Promise.resolve({});
            });
            if (newCreds.expireTime) {
                client.updateWebSocketCredentials(
                    newCreds.accessKeyId,
                    newCreds.secretAccessKey,
                    newCreds.sessionToken,
                    newCreds.expireTime
                );
                const nextExp = newCreds.expireTime.getTime() - new Date().getTime();
                setRefresh (nextExp);
            } else {
                console.log("error getting credentials, retry 8s");
                setRefresh(8000);
            }
        }, millis);
    };
    setRefresh((cred.expireTime.getTime() - new Date().getTime()));

    return client;


};

const bringUp = async () => {
    return await Thing.up();
};

const bringDown = async () => {
    return await Thing.down();
};


export {bringUp, bringDown};

// const createDevice_ = (credentials) => {
//     const thing = 'Temp';
//     var registered = false;
//     const shadow = IOT.thingShadow({
//         region: 'us-east-1',
//         protocol: 'wss',
//         host: 'ad78o9k6p57sk.iot.us-east-1.amazonaws.com',
//         clientId: 'iot-demo' + Math.random(10000000),
//         maximumReconnectTimeMs: 8000,
//         debug: true,
//         accessKeyId: credentials.accessKeyId,
//         secretKey: credentials.secretAccessKey,
//         sessionToken: credentials.sessionToken
//     });
//     shadow.on('connect', () => {
//         console.log("connected");
//         if (!registered) {
//             shadow.register(thing, {
//                 persistentSubscribe: true
//             });
//             console.log("registered");
//             registered = true;
//         }
//     });
//     shadow.on('reconnect', function () {
//         console.log("reconnect")
//     });
//     shadow.on('delta', function (name, stateObj) {
//         console.log(name, "DELTA: " + JSON.stringify(stateObj));
//     });
//     shadow.on('status', function (name, type, token, stateObj) {
//         console.log(name, "STATUS: " + JSON.stringify(stateObj));
//     });
//     shadow.on('foreignStateChange', (name, op, obj) => {
//         console.log("foreign state change", (name, op, obj));
//     });
//     setTimeout( function () {
//         const v = shadow.get(thing);
//         console.log("GET CODE:", v);
//     }, 3000);
// };


