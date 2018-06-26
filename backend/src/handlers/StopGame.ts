import {IIncomeMsg, IStartGame} from "../contracts/Interfaces";
import {log, parseIncomeData} from "../helpers/helpers";
import {ioc} from "../inversify";
import Game from "../models/Game";
import {TYPES} from "../types";
import GameService from "../services/GameService";
import {publish, reply} from "../helpers/natsFacade";

/**
 * Callback for stop game resolver
 */
export default () => async (msg: string, replyTo: string, subject: string) => {

    let data: IIncomeMsg<IStartGame> = parseIncomeData<IStartGame>(msg),
        playerName = data.player,
        game = ioc.get<Game>(TYPES.Game),
        gaming = ioc.get<GameService>(TYPES.GameService);

    try {
        game.players.findByName(playerName);
        gaming.stopGame(game);

        let total = game.players.total();
        publish('waiting', {online: total, waiting: game.needPlayers - total});

        reply(replyTo, {success: true});
    }
    catch (e) {
        reply(replyTo, {error: e.message, subject: subject, data: data});
        log(e);
    }
}