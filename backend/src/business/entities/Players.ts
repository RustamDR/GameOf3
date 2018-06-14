/**
 * Players
 */
export default class Players {

    /**
     * Players
     * @type {Array}
     * @private
     */
    private _online: string[] = [];

    /**
     * Add player
     * @param {string} name
     * @returns {boolean}
     */
    add(name: string) {
        if (this._online.indexOf(name) === -1) {
            this._online.push(name);
            return true;
        }

        return false;
    }

    /**
     * Total added players
     * @returns {number}
     */
    total(): number {
        return this._online.length;
    }

    /**
     * Remove all players
     */
    clear() {
        this._online = [];
    }

    /**
     * Get player by id
     * @param {number} id
     * @returns {string}
     */
    getPlayer(id: number): string {
        return this._online[id];
    }

    /**
     * Find player id by his name
     * @param {string} name
     * @returns {number}
     */
    find(name: string): number {
        let id = this._online.indexOf(name);
        return id > -1 ? id : null;
    }
}