import {parseIncomeData} from "../../helpers/helpers";
import log from "../../helpers/error";
import {IIncomeMsg, IMove, IMoveReply} from "../../contracts/Interfaces";
import {ioc} from "../../inversify";
import Game from "../entities/Game";
import {TYPES} from "../../config/types";
import {publish, reply} from "../../helpers/natsFacade";

/**
 * Callback to event "move"
 */
export default () => async (msg: string, replyTo: string, subject: string) => {

    let data: IIncomeMsg<IMove> = parseIncomeData<IMove>(msg),
        player = data.player,
        game = ioc.get<Game>(TYPES.Game),
        mutateWithNum = data.data.mutationNumber,
        result: IMoveReply = {action: 'move', data: null};

    try {
        if (game.players.find(player) === null) {
            throw new Error('Player ' + player + ' is not in the game');
        }

        if (!game.isProcess()) {
            throw new Error('The game has not started yet');
        }

        if (!Number.isInteger(mutateWithNum) || [0,1,-1].indexOf(mutateWithNum) === -1) {
            throw new Error('Received number is not int or not in [0,1,-1]');
        }

        let move = game.addMove(player, mutateWithNum);
        log(player + ' moved with ' + mutateWithNum + ', result = ' + move.result);

        let winnerId = game.checkWinner();
        if (winnerId === null) {
            result.data = game.next();
            // No winner, continue game
            publish('next', result.data);
        }
        else {
            result.action = 'won';
            result.data = {player: game.players.getPlayer(winnerId)};
            publish('won', result.data);
            game.stop();
            log(player + ' won!');
        }

        reply(replyTo, result);
    }
    catch (e) {
        reply(replyTo, {error: e.message, subject: subject, data: data});
        log(e);
    }
}