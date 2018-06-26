import Move from "../models/Move";
import Player from "../models/Player";
import gameConf from "../config/game.config";
import Game from "../models/Game";
import {injectable} from "inversify";

/**
 * Business logic layer for Moves
 */
@injectable()
export default class MoveService {

    /**
     * First move of the game with some random initial number
     * @param {Player} player
     * @returns {Move}
     */
    createFirstMove(player: Player): Move {
        let initialNumber = require('random-int');
        return new Move(player, 0, initialNumber(gameConf.min, gameConf.max), null);
    }

    /**
     *
     * @param {Game} game
     * @param {Player} player
     * @param {number} mutationNumber
     * @returns {Move}
     */
    createNextMove(game: Game, player: Player, mutationNumber: number): Move {

        if (!Number.isInteger(mutationNumber) || [0, 1, -1].indexOf(mutationNumber) === -1) {
            throw new Error('Received number is not int or not in [0,1,-1]');
        }

        let tempResult = game.lastResult() + mutationNumber,
            divideBy = gameConf.divideBy;

        if (tempResult % divideBy !== 0) {
            throw new Error('Result must be divided by '+ divideBy + ' without residue');
        }

        return new Move(player, mutationNumber, tempResult / divideBy, game.lastMove);
    }
}