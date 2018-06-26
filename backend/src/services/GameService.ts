import Game from "../models/Game";
import MoveService from "./MoveService";
import Player from "../models/Player";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";

/**
 * Business logic layer for the "Game"
 */
@injectable()
export default class GameService {

    /**
     * Move Service
     */
    private moving: MoveService;

    /**
     * Constructor
     * @param {MoveService} moveService
     */
    constructor(@inject(TYPES.MoveService) moveService: MoveService) {
        this.moving = moveService;
    }

    /**
     * Start the game (starts the first joined player with id 0)
     */
    startNewGame(game: Game, player: Player): boolean {
        if (!(game.state.isWaiting() && this.enoughPlayers(game))) {
            return false;
        }

        game.initMove = this.moving.createFirstMove(player);
        game.state.toProcess();
        return true;
    }

    /**
     * Checking is there enough players in the game
     * @returns {boolean}
     */
    private enoughPlayers(game: Game): boolean {
        return game.players.total() === game.needPlayers;
    }

    /**
     * Try to join a new player to the game
     * @param {Game} game
     * @param {Player} player
     */
    joinPlayer(game: Game, player: Player) {
        if (!game.state.isWaiting()) {
            throw new Error('Game is in process!');
        }

        if (this.enoughPlayers(game)) {
            throw new Error('The maximum of players is reached!');
        }

        game.players.add(player);
    }

    /**
     * Stopping the game
     */
    stopGame(game: Game) {
        game.state.toWaiting();

        game.initMove = null;
        game.players.clear();
    }

    /**
     * Is there who won?
     * @param {Game} game
     * @returns boolean
     */
    checkWinner(game: Game): boolean {
        return game.lastResult() === 1;
    }

    /**
     * Try to create a new move
     * @param {Game} game
     * @param {Player} player
     * @param {number} mutationNumber
     */
    addMove(game: Game, player: Player, mutationNumber: number) {

        if (!game.state.isInProcess()) {
            throw new Error('The game has not started yet');
        }

        if (!game.players.has(player)) {
            throw new Error('Player ' + player.name + ' is not it the game');
        }

        if (!player.equals(this.getWhoIsNext(game))) {
            throw new Error('It\'s not ' + player.name + ' move');
        }

        game.lastMove = this.moving.createNextMove(game, player, mutationNumber);

        return game.lastMove;
    }

    /**
     * Who goes next
     * @param {Game} game
     * @returns {Player}
     */
    getWhoIsNext(game: Game): Player {
        let players = game.players,
            index = game.moveNum % players.total();

        return players.getByIndex(index);
    }
}