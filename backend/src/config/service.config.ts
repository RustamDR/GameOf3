import {IAppEventsConfig} from "../contracts/Interfaces";
import StartGame from "../handlers/StartGame";
import DoMove from "../handlers/DoMove";
import StopGame from "../handlers/StopGame";

const appConf: IAppEventsConfig = {

    eventsListen: {
        join: {
            resolve: StartGame,
        },
        move: {
            resolve: DoMove,
        },
        stop: {
            resolve: StopGame,
        }
    }
};

export default appConf;