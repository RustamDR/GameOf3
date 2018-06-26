import "reflect-metadata";
import appConf from "./config/service.config";
import {subscribe} from "./helpers/natsFacade";
import {log} from "./helpers/helpers";

let events = appConf.eventsListen; // Getting events to listen to

try {
    for (let eventName in events) {
        subscribe(eventName, events[eventName]['resolve']());
    }
}
catch (err) {
    log(err);
}