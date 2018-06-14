import Move from "./Move";
import Players from "./Players";

/**
 * The Game
 */
export default class Game {

    static readonly PROCESS = 'process';
    static readonly WAITING = 'waiting';
    private _status: string;

    /**
     * First move
     */
    private _initMove: Move;

    /**
     * Last move
     */
    private _lastMove: Move;

    /**
     * Move counter
     * @type {number}
     */
    private moveNum: number;
    /**
     * Count players needed to start the game
     */
    needPlayers: number;

    /**
     * Players in the game
     */
    players: Players = new Players;

    /**
     * Start the game (starts the first joined player with id 1)
     */
    start(): boolean {
        this.moveNum = 1;

        let firstNumber = require('random-int');
        this._initMove = this.addMove(this.players.getPlayer(1), firstNumber(17, 100));

        this._status = Game.PROCESS;

        return true;
    }

    /**
     * Stopping the game
     */
    stop() {
        this.players.clear();
        this._initMove = null;
        this._lastMove = null;
        this._status = Game.WAITING;
    }

    isWaiting(): boolean {
        return this._status === Game.WAITING;
    }

    isProcess(): boolean {
        return this._status === Game.PROCESS;
    }

    /**
     * Join player by his name to the game
     * @param {string} playerName
     * @returns {boolean}
     */
    join(playerName: string): boolean {
        if (!this.isWaiting()) {
            return false;
        }

        return this.players.add(playerName);
    }

    /**
     * Checking to start the game
     * @returns {boolean}
     */
    tryStart(): boolean {
        if (this.isWaiting() && this.enoughPlayers()) {
            return this.start();
        }

        return false;
    }

    enoughPlayers(): boolean {
        return this.players.total() === this.needPlayers;
    }


    /**
     * Add move
     * @param {string} player
     * @param {number} number
     * @returns {Move}
     */
    addMove(player: string, number: number): Move {
        let playerId = this.moveNum % this.needPlayers; // Players change by circle (it passes around)

        if (this.players.find(player) !== playerId) {
            throw new Error('It\'s not ' + player + '\'s move');
        }

        this._lastMove = new Move(playerId, number, this.lastMove);

        return this._lastMove;
    }

    /**
     * Next player name who moves and number to mutate
     * @returns {string}
     */
    next(): { player: string; number: number } {
        this.moveNum++;
        let id = this.moveNum % this.needPlayers;

        return {
            player: this.players.getPlayer(id),
            number: this._lastMove.result
        };
    }

    /**
     * Get first move of the game
     * @returns {Move}
     */
    get firstMove(): Move {
        return this._initMove;
    }

    /**
     * Get last move of the game
     * @returns {Move}
     */
    get lastMove(): Move {
        return this._lastMove;
    }

    /**
     * Return winner
     * @returns {number}
     */
    checkWinner(): number {
        return this.lastMove.result === 1 ? this.lastMove.gamerId : null;
    }
}