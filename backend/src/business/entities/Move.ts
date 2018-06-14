/**
 * Movement - element of chain
 */
export default class Move {

    /**
     * Previous move
     */
    private _previous: Move;

    /**
     * Number, that mutates previous move [-1,0,1]
     */
    private _mutationNumber: number;

    /**
     * Result of mutation
     */
    private _result: number;

    /**
     * Gamer, who did move
     */
    private _playerId: number;

    /**
     * Constructor
     * @param {number} playerId
     * @param {number} mutationNumber
     * @param {Move} previous
     */
    constructor(playerId: number, mutationNumber: number, previous: Move = null) {

        this._previous = previous;
        this._mutationNumber = mutationNumber;
        this._playerId = playerId;

        this.check();
    }

    /**
     * @returns {number}
     */
    get result(): number {
        return this._result;
    }

    /**
     * @returns {number}
     */
    get playerId(): number {
        return this._playerId;
    }

    private isFirstMove(): boolean {
        return this._previous === null;
    }

    /**
     * Check, that move is correct
     */
    private check(): void {
        if (this.isFirstMove()) {
            this._result = this._mutationNumber; // Is initial number
            this._mutationNumber = 0;

            return;
        }

        if (this._previous.playerId === this.playerId) {
            throw new Error('Double move of user ' + this.playerId);
        }

        if ((this._previous.result + this._mutationNumber) % 3 !== 0) {
            throw new Error('Result must be divided by 3 without residue');
        }

        this._result = (this._previous.result + this._mutationNumber) / 3;
    }
}