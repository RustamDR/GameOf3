import {parseIncomeData} from "../../helpers/helpers";
import log from "../../helpers/error";
import {IIncomeMsg, IStartGame} from "../../contracts/Interfaces";
import {ioc} from "../../inversify";
import Game from "../entities/Game";
import {TYPES} from "../../config/types";
import {publish, reply} from "../../helpers/natsFacade";

/**
 * Callback to event "start"
 */
export default () => async (msg: string, replyTo: string, subject: string) => {

    let data: IIncomeMsg<IStartGame> = parseIncomeData<IStartGame>(msg),
        player = data.player,
        game = ioc.get<Game>(TYPES.Game);

    try {
        if (game.players.find(player)) {
            throw new Error('You are already in the game');
        }

        if (game.isProcess()) {
            throw new Error('You could not join to the process game');
        }

        game.join(player);

        if (!game.tryStart()) {
            // If game could not start, we are waiting for next players
            let total = game.players.total();
            publish('waiting', {online: total, waiting: game.needPlayers - total});
        }
        else {
            // The game started, the next player tries to mutate init number
            publish('move', game.next())
        }
    }
    catch (e) {
        reply(replyTo, {error: e.message, subject: subject, data: data});
        log(e);
    }
}