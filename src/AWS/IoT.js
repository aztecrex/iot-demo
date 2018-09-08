import * as R from 'ramda';
import IOT from 'aws-iot-device-sdk';
import { awsCredentials } from './Authenticate';

const clientId = () =>
    awsCredentials()
        .then(c => c.identityId);


const PRES_THING = 'Presentation';
const RING_THING_0 = 'iot-demo-thing-Ring0-Device-W4VQWR2ALD3T';
const RING_THING_1 = 'iot-demo-thing-Ring1-Device-VG0H11KPBHUW';

const RawThings = [
    PRES_THING,
    RING_THING_0,
    RING_THING_1
];

const LogicalNames = {
    [PRES_THING]: "Presentation",
    [RING_THING_0]: "Ring0",
    [RING_THING_1]: "Ring1"
}

const PhysicalNames = {
    "Presentation": PRES_THING,
    "Ring0": RING_THING_0,
    "Ring1": RING_THING_1
}

// const Things = R.map(rt => thingNamespace + "_" + rt, RawThings);


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
    const up = (callback) => {
        if (client) {
            down();
        }
        client = createClient(callback);
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

const createClient = async (callback) => {

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
        await Promise.all(R.map(thing => register(client,thing), RawThings))
            .catch(error => console.error("Error registering", error));
        RawThings.forEach(thing => client.get(thing));
    });
    client.on('reconnect', () => {
        console.log("client is reconnect")
    });
    client.on('status', function (name, statusType, token, obj) {
        if (callback)
            callback({
                type: 'STATUS',
                name: LogicalNames[name],
                statusType,
                token,
                obj
            });
    });
    client.on('foreignStateChange', (name, foreignOp, obj) => {
        // console.log(name, op, obj, "foreign state change");
        if (callback)
            callback({
                type: 'FOREIGN',
                name: LogicalNames[name],
                foreignOp,
                obj
            });
    });
    client.on('error', (error) => {
        console.error("client error", error);
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

const bringUp = async (callback) => {
    return await Thing.up(callback);
};

const bringDown = async () => {
    return await Thing.down();
};


export {bringUp, bringDown};

