import {IIncomeMsg, IStartGame, IStartGameReply} from "../contracts/Interfaces";
import {parseIncomeData, log} from "../helpers/helpers";
import {ioc} from "../inversify";
import Game from "../models/Game";
import {TYPES} from "../types";
import GameService from "../services/GameService";
import {publish, reply} from "../helpers/natsFacade";
import Player from "../models/Player";

/**
 * Callback for start game resolver
 */
export default () => async (msg: string, replyTo: string, subject: string) => {

    let data: IIncomeMsg<IStartGame> = parseIncomeData<IStartGame>(msg),
        playerName = data.player,
        game = ioc.get<Game>(TYPES.Game),
        gaming = ioc.get<GameService>(TYPES.GameService),
        result: IStartGameReply = {action: 'move', data: null};

    try {
        let player = new Player(playerName);

        gaming.joinPlayer(game, player);
        log('Player ' + player.name + ' connected');

        if (gaming.startNewGame(game, player)) {
            // The game has started, sending data to the next player
            result.data = {"player": gaming.getWhoIsNext(game).name, "number": game.lastResult()};
            publish('next', result.data);
            log('Game started with ' + game.lastResult() + ', ' + player.name + ' moves');
        }
        else {
            // If game could not start, we are waiting for next players
            let total = game.players.total();
            result.action = 'waiting';
            result.data = {online: total, waiting: game.needPlayers - total};
            publish(result.action, result.data);
        }

        reply(replyTo, result);
    }
    catch (e) {
        reply(replyTo, {error: e.message, subject: subject, data: data});
        log(e);
    }
}