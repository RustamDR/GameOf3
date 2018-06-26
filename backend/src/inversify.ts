import {Container} from "inversify";
import {TYPES} from "./types";
import Game from "./models/Game";
import GameService from "./services/GameService";
import MoveService from "./services/MoveService";
import gameConf from "./config/game.config";

const ioc = new Container();

// -------------------------Singletons
ioc.bind<Game>(TYPES.Game).toConstantValue(new Game(gameConf.countOfPlayers));

// -------------------------Services
ioc.bind<GameService>(TYPES.GameService).to(GameService).inSingletonScope();
ioc.bind<MoveService>(TYPES.MoveService).to(MoveService).inSingletonScope();
export {ioc};