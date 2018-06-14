import {IAppEventsConfig} from "../contracts/Interfaces";
import StartGame from "../business/operations/StartGame";
import Move from "../business/operations/Move";

const appConf: IAppEventsConfig = {

    countOfPlayers: 2,

    eventsListen: {
        start: {
            resolve: StartGame,
        },
        move: {
            resolve: Move,
        },
    }
};

export default appConf;