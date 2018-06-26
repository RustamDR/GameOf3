import Entity from "./Entity";
import {IdType} from "../../contracts/Interfaces";

/**
 * Collections for Entities
 */
export default abstract class Collection<E extends Entity> {
    /**
     * Entities storage
     */
    private _collection: E[] = [];

    /**
     * Counter
     * @type {number}
     * @private
     */
    private _count: number = 0;

    /**
     * Is here Entity
     * @param {E} entity
     * @returns {boolean}
     */
    has(entity: E): boolean {
        return !(this.findById(entity.id) === null);
    }

    /**
     * Add new Entity to collection
     * @param {E} entity
     */
    add(entity: E) {
        if (this.has(entity)) {
            throw new Error('Collection has entity: ' + entity.id);
        }

        this._count++;
        this._collection.push(entity);
    }

    /**
     * Total amount of Entities
     * @returns {number}
     */
    total(): number {
        return this._count;
    }

    /**
     * Flush all Entities
     */
    clear() {
        this._count = 0;
        this._collection = [];
    }

    /**
     * Find by unique identifier
     * @param {IdType} id
     * @returns {E}
     */
    findById(id: IdType): E {
        return this._collection.find(el => el.id === id) || null;
    }

    /**
     * Get as array
     * @returns {E[]}
     */
    protected get collection() {
        return this._collection;
    }
}