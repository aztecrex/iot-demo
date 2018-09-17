import * as R from 'ramda';
import IOT from 'aws-iot-device-sdk';
import { awsCredentials } from './Authenticate';

const clientId = () =>
    awsCredentials()
        .then(c => c.identityId);


const PRES_THING = 'iot-demo-thing-Presentation-Device-1ROQMZ1DS7LHY';
const RING_THING_0 = 'iot-demo-thing-Ring0-Device-759W16L3V7JJ';
const RING_THING_1 = 'iot-demo-thing-Ring1-Device-GF47OOHQKUBT';
const MATRIX_THING = 'iot-demo-thing-Matrix0-Device-163UIKMS5LRI3';
const LANYARD_THING = 'iot-demo-thing-Lanyard-Device-YY67CDETS8PP';

const RawThings = [
    PRES_THING,
    RING_THING_0,
    RING_THING_1,
    MATRIX_THING,
    LANYARD_THING,
];

const LogicalNames = {
    [PRES_THING]: "Presentation",
    [RING_THING_0]: "Ring0",
    [RING_THING_1]: "Ring1",
    [MATRIX_THING]: "Matrix",
    [LANYARD_THING]: "Lanyard",
}

const PhysicalNames = {
    "Presentation": PRES_THING,
    "Ring0": RING_THING_0,
    "Ring1": RING_THING_1,
    "Matrix": MATRIX_THING,
    "Lanyard": LANYARD_THING,
}


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

    const setLampColor = (logical, key, color ) => {
        if (!client) return Promise.resolve({});
        const physical = PhysicalNames[logical];
        const updateState = {
            state: {
                desired: {
                    [key]: color
                }
            }
        };

        return client
            .then(c => c.update(physical, updateState))
            .then({});
    }

    const setLanyardStatus = (logical, animation, visible) => {
        if (!client) return Promise.resolve({});
        const physical = PhysicalNames[logical];
        const updateState = {
            state: {
                desired: {
                    type: animation,
                    visible,
                }
            }
        };
        return client
            .then(c => c.update(physical, updateState))
            .then({});

    };

    return {up, down, setLampColor, setLanyardStatus};


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
        debug: false,
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
        RawThings.forEach(thing => client.get(thing));
    });
    client.on('status', function (name, statusType, token, obj) {
        if (callback) {
            callback({
                type: 'STATUS',
                name: LogicalNames[name],
                statusType,
                token,
                obj
            });
        }
    });
    client.on('foreignStateChange', (name, foreignOp, obj) => {
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
        setTimeout(async () => {
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

const setLampColor = async (logical, key, color) => {
    return Thing.setLampColor(logical, key, color).catch(err => console.error(err));
}

const bumpAnimation = curAnimation => {
    return Thing.setLanyardStatus("Lanyard", curAnimation + 1, true).catch(err => console.error(err));
};


export {bringUp, bringDown, setLampColor, bumpAnimation};

