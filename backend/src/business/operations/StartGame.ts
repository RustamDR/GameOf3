import {parseIncomeData} from "../../helpers/helpers";
import log from "../../helpers/error";
import {IIncomeMsg, IStartGame, IStartGameReply} from "../../contracts/Interfaces";
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
        game = ioc.get<Game>(TYPES.Game),
        result: IStartGameReply = {action: 'move', data: null};

    try {
        if (game.players.find(player)) {
            throw new Error('You are already in the game');
        }

        if (game.isProcess()) {
            throw new Error('You could not join to the process game');
        }

        if (!game.join(player)) {
            throw new Error('Player ' + player + ' not joined to the game. Something wrong!');
        }

        log('Player ' + player + ' connected');

        if (!game.tryStart()) {
            // If game could not start, we are waiting for next players
            let total = game.players.total();
            result.action = 'waiting';
            result.data = {online: total, waiting: game.needPlayers - total};
            publish(result.action, result.data);
        }
        else {
            // The game started, sending data to the next player
            result.data = game.next();
            publish('next', result.data);
            log('Game started with ' + game.next().number + ', ' + game.next().player + ' moves');
        }

        reply(replyTo, result);
    }
    catch (e) {
        reply(replyTo, {error: e.message, subject: subject, data: data});
        log(e);
    }
}