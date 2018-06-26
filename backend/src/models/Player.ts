import Entity from "./abstracts/Entity";

/**
 * Player Entity
 */
export default class Player extends Entity {

    /**
     * Name of current player
     */
    private _name: string;

    /**
     * Constructor
     * @param {string} name
     * @param {number|null} id
     */
    constructor(name: string, id: number = null) {
        super(id);
        this.name = name;
    }

    /**
     * Get name
     * @returns {string}
     */
    get name(): string {
        return this._name;
    }

    /**
     * Set name
     * @param {string} value
     */
    set name(value: string) {
        if (value === '') {
            throw new Error('Player could not be empty!');
        }
        this._name = value;
    }
}