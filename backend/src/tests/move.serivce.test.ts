import "reflect-metadata";

import {expect} from 'chai';
import {describe} from "mocha";
import {ioc} from "../inversify";
import MoveService from "../services/MoveService";
import {TYPES} from "../types";

describe("Player test cases examples", () => {
    let moveService = ioc.get<MoveService>(TYPES.MoveService);

    // TODO some move serivce cases
});