import {Container} from "inversify";
import Game from "./business/entities/Game";
import {TYPES} from "./config/types";
import appConf from "./config/service.config";

const ioc = new Container();

ioc.bind<Game>(TYPES.Game).to(Game).inSingletonScope().onActivation(function (context, game) {
    game.needPlayers = appConf.countOfPlayers;
    return game;
});
export {ioc};