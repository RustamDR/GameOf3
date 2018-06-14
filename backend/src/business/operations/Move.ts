import {parseIncomeData} from "../../helpers/helpers";
import log from "../../helpers/error";
import {IIncomeMsg, IMove} from "../../contracts/Interfaces";
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
        game = ioc.get<Game>(TYPES.Game);

    try {

        if (!game.players.find(player)) {
            throw new Error('Player ' + player + 'is not in the game');
        }

        if (!game.isProcess()) {
            throw new Error('The game has not started yet');
        }

        game.addMove(player, data.data.mutateNumber);

        let winnerId = game.checkWinner();
        if (winnerId) {
            publish('won', {player: game.players.getPlayer(winnerId)});
            game.stop();
        }
        else {
            publish('move', game.next());
        }
    }
    catch (e) {
        reply(replyTo, {error: e.message, subject: subject, data: data});
        log(e);
    }
}