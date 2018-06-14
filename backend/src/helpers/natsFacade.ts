import * as NATS from 'nats';
import natsConf from "../config/nats.config";

function natsConnect(): NATS.Client {
    try {
        return NATS.connect(natsConf);
    }
    catch (e) {
        throw new Error(e);
    }
}

const nats = natsConnect();

export function subscribe(subject: string, fn: Function) {
    let conf = require('../../package.json');
    nats.subscribe(`${conf.name}.${subject}`, {queue: `${conf.name}.workers`}, fn);
}

export function publish(subject: string, msg?: object) {
    let conf = require('../../package.json');
    nats.publish(`${conf.name}.${subject}`, JSON.stringify(msg));
}

export function publishError(subject: string, err: any) {
    let conf = require('../../package.json'),
        error = {
            error: err
        };
    nats.publish(`${conf.name}.${subject}`, JSON.stringify(error));
}

export function reply(to: string, msg?: object) {
    nats.publish(to, JSON.stringify(msg));
}