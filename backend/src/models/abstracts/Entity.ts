import Id from "./Id";
import {IdType} from "../../contracts/Interfaces";
import {uuid} from "../../helpers/helpers";

/**
 * Entity
 */
export default class Entity extends Id {
    /**
     * Constructor
     * @param {IdType} id
     */
    constructor(id: IdType) {
        super(id || uuid());
    }
}