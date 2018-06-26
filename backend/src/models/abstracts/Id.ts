import {IdType} from "../../contracts/Interfaces";

/**
 * Identified
 */
export default abstract class Id {
    /**
     * Id value
     */
    private _id: IdType;

    /**
     * Constructor
     * @param {IdType} id
     */
    constructor(id: IdType) {
        this._id = id;
    }

    /**
     * Get id
     * @returns {IdType}
     */
    get id(): IdType {
        return this._id;
    }

    /**
     * Set id
     * @param {IdType} value
     */
    set id(value: IdType) {
        this._id = value;
    }

    /**
     * Check equals to another identifier
     * @param {Id} identity
     * @returns {boolean}
     */
    equals(identity: Id): boolean {
        return this.id === identity.id;
    }
}