import {IAppEventsConfig} from "../contracts/Interfaces";
import StartGame from "../business/operations/StartGame";
import Move from "../business/operations/Move";
import StopGame from "../business/operations/StopGame";

const appConf: IAppEventsConfig = {

    countOfPlayers: 2,

    eventsListen: {
        join: {
            resolve: StartGame,
        },
        move: {
            resolve: Move,
        },
        stop: {
            resolve: StopGame,
        }
    }
};

export default appConf;