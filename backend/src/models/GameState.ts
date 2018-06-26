/**
 * Game state
 */
export default class GameState {
    static readonly PROCESS = 'process';
    static readonly WAITING = 'waiting';

    /**
     * State code
     * @type {string}
     * @private
     */
    private _code: string = GameState.WAITING;

    /**
     * Is waiting for users
     * @returns {boolean}
     */
    isWaiting(): boolean {
        return this._code === GameState.WAITING;
    }

    /**
     * Is game in process
     * @returns {boolean}
     */
    isInProcess(): boolean {
        return this._code === GameState.PROCESS;
    }

    /**
     * Move game to process
     */
    toProcess() {
        this._code = GameState.PROCESS;
    }

    /**
     * Move game to waiting users
     */
    toWaiting() {
        this._code = GameState.WAITING;
    }
}