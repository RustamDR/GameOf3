import Collection from "./abstracts/Collection";
import Player from "./Player";
import {injectable} from "inversify";

/**
 * Collection of the Players
 */
@injectable()
export default class Players extends Collection<Player> {
    /**
     * Is there player with some name
     * @param {string} name
     * @returns {Player}
     */
    findByName(name: string): Player {
        let player = this.collection.find(player => player.name === name) || null;

        if (player) {
            return player;
        }

        throw new Error('Player ' + name + ' not found');
    }

    /**
     * Find player by index
     * @param {number} index
     * @returns {Player}
     */
    getByIndex(index: number): Player {
        if (index > this.total() - 1) {
            throw new Error('Out of range of the total players');
        }
        return this.collection[index];
    }
}