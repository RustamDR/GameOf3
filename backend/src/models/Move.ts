import Entity from "./abstracts/Entity";
import Player from "./Player";

/**
 * Move Entity
 */
export default class Move extends Entity {

    /**
     * Previous move
     */
    private _previous: Move;

    /**
     * Number, that mutates previous
     */
    private _mutationNumber: number;

    /**
     * Result of mutation
     */
    private _result: number;

    /**
     * Player, who did move
     */
    private _player: Player;

    /**
     * Constructor
     * @param {Player} player
     * @param {number} mutationNumber
     * @param {number} result
     * @param {Move} previous
     */
    constructor(player: Player, mutationNumber: number, result: number, previous: Move = null) {
        super(null);
        this._previous = previous;
        this._mutationNumber = mutationNumber;
        this._player = player;
        this._result = result;
    }

    /**
     * Get result
     * @returns {number}
     */
    get result(): number {
        return this._result;
    }

    /**
     * Get player
     * @returns {Player}
     */
    get player(): Player {
        return this._player;
    }
}