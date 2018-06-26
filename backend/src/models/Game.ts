import Move from "./Move";
import Players from "./Players";
import {injectable} from "inversify";
import GameState from "./GameState";
import Entity from "./abstracts/Entity";

/**
 * Game entity (aggregate root)
 */
@injectable()
export default class Game extends Entity {

    /**
     * Game state
     */
    state: GameState;

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
    private _moveNum: number;

    /**
     * Count players needed to start the game
     */
    private _needPlayers: number;

    /**
     * Players in the game
     */
    players: Players;

    /**
     * Constructor
     * @param {number} needPlayers
     */
    constructor(needPlayers: number) {
        super(null);
        this._needPlayers = needPlayers;
        this.state = new GameState;
        this.players = new Players;
    }

    /**
     * Needed players to start the game
     * @returns {number}
     */
    get needPlayers(): number {
        return this._needPlayers;
    }

    /**
     * Get a last move of the game
     * @param {Move} move
     */
    set lastMove(move: Move) {
        this._lastMove = move;
        this._moveNum = this._lastMove ? this._moveNum + 1 : 0;
    }

    /**
     * Get a last number result of the game
     * @returns {number}
     */
    lastResult(): number {
        return this._lastMove.result;
    }

    /**
     * Set initial move of the game
     * @param {Move} move
     */
    set initMove(move: Move) {
        this._moveNum = 0;
        this._initMove = move;
        this.lastMove = move;
    }

    /**
     * Number of movement
     * @returns {number}
     */
    get moveNum(): number {
        return this._moveNum;
    }
}