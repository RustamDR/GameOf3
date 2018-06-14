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
    private _gamerId: number;

    /**
     * Constructor
     * @param {number} playerId
     * @param {number} mutationNumber
     * @param {Move} previous
     */
    constructor(playerId: number, mutationNumber: number, previous: Move = null) {

        this._mutationNumber = mutationNumber;
        this._gamerId = playerId;
        this._previous = previous;

        this.calculate();

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
    get gamerId(): number {
        return this._gamerId;
    }

    /**
     * Check, that move is correct
     */
    check() {
        if (this._previous.gamerId === this.gamerId) {
            throw new Error('Double move of user ' + this.gamerId);
        }

        if (this._result % 3 !== 0) {
            throw new Error('Result must be divided by 3 without residue');
        }
    }

    /**
     * Calculate result of move
     */
    private calculate() {
        if (!this._previous) {
            // This is first move
            this._result = this._mutationNumber;
            this._mutationNumber = 0;

            return;
        }

        this._result = (this._previous.result + this._mutationNumber) / 3;
    }
}