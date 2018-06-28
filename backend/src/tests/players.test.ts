import "reflect-metadata";

import {expect} from 'chai';
import {describe} from "mocha";
import Players from "../models/Players";
import Player from "../models/Player";

describe("Player cases", () => {

    let player = new Player('John');

    it("New player has id", () => {
        expect(player.id).is.not.null;
    });

    let players = new Players();
    it("Players collection is empty", () => {
        expect(players.total()).is.eq(0);
    });

    it("Add player to empty collection", () => {
        players.add(player);

        expect(players.findById(player.id)).is.eq(player);
        expect(players.total()).is.eq(1);
        expect(() => {
            players.add(player);
        }).to.throw(Error, /Collection has entity/);
    });

    it("Remove all players from collection", () => {
        players.clear();

        expect(players.total()).is.eq(0);
        expect(players.has(player)).false;
    });

});