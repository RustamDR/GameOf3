import GameService from "../services/GameService";
import {IIncomeMsg, IMove, IMoveReply} from "../contracts/Interfaces";
import {log, parseIncomeData} from "../helpers/helpers";
import {ioc} from "../inversify";
import Game from "../models/Game";
import {TYPES} from "../types";
import {publish, reply} from "../helpers/natsFacade";

/**
 * Callback for move resolver
 */
export default () => async (msg: string, replyTo: string, subject: string) => {

    let data: IIncomeMsg<IMove> = parseIncomeData<IMove>(msg),
        playerName = data.player,
        game = ioc.get<Game>(TYPES.Game),
        gaming = ioc.get<GameService>(TYPES.GameService),
        mutationNum = data.data.mutationNumber,
        result: IMoveReply = {action: 'move', data: null};

    try {
        let player = game.players.findByName(playerName);

        gaming.addMove(game, player, mutationNum);

        log(player.name + ' moved with ' + mutationNum + ', result = ' + game.lastResult());

        if (gaming.checkWinner(game)) {
            // Yehoo, somebody won!
            result.action = 'won';
            result.data = {player: player.name};
            gaming.stopGame(game);

            publish('won', result.data);
            log(player.name + ' won!');
        }
        else {
            // No winner, continue game
            result.data = {player: gaming.getWhoIsNext(game).name, number: game.lastResult()};
            publish('next', result.data);
        }

        reply(replyTo, result);
    }
    catch (e) {
        reply(replyTo, {error: e.message, subject: subject, data: data});
        log(e);
    }
}