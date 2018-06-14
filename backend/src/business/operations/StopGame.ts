import {parseIncomeData} from "../../helpers/helpers";
import log from "../../helpers/error";
import {IIncomeMsg, IStartGame} from "../../contracts/Interfaces";
import {ioc} from "../../inversify";
import Game from "../entities/Game";
import {TYPES} from "../../config/types";
import {publish, reply} from "../../helpers/natsFacade";

/**
 * Callback to event "stop"
 */
export default () => async (msg: string, replyTo: string, subject: string) => {

    let data: IIncomeMsg<IStartGame> = parseIncomeData<IStartGame>(msg),
        player = data.player,
        game = ioc.get<Game>(TYPES.Game);

    try {
        if (game.players.find(player) === null) {
            throw new Error('Only players in the game can stop the game');
        }

        game.stop();

        let total = game.players.total();
        publish('waiting', {online: total, waiting: game.needPlayers - total});

        reply(replyTo, {success: true});
    }
    catch (e) {
        reply(replyTo, {error: e.message, subject: subject, data: data});
        log(e);
    }
}