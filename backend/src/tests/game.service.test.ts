import "reflect-metadata";

import {expect} from 'chai';
import {describe} from "mocha";
import Game from "../models/Game";
import Player from "../models/Player";
import {ioc} from "../inversify";
import {TYPES} from "../types";
import GameService from "../services/GameService";

describe("Gaming cases", () => {

    let needPlayers = 2,

        game = new Game(needPlayers),
        gameService = ioc.get<GameService>(TYPES.GameService);

    it("New game has \"Waiting\" state", () => {
        expect(game.state.isWaiting()).true;
    });

    it("New game has 0 players", () => {
        expect(game.players.total()).is.eq(0);
    });

    let player1 = new Player('John');
    let player2 = new Player('Andrew');

    it("Not enough players couldn\'t start the game", () => {
        expect(gameService.startNewGame(game, player1)).false;

        gameService.joinPlayer(game, player1);
        expect(game.players.total()).is.eq(1);

        expect(gameService.startNewGame(game, player1)).false;
    });

    it("Enough players can start the game and game state has to be \"In process\"", () => {
        gameService.joinPlayer(game, player2);
        expect(game.players.total()).is.eq(2);
        expect(gameService.startNewGame(game, player2)).true;
    });

    it("The last joined player has to move", () => {
        expect(gameService.getWhoIsNext(game)).eq(player2);
    });

    // TODO some cases to emulate the game!

    it("Stopping the game", () => {
        gameService.stopGame(game);
        expect(game.state.isWaiting()).true;
    });
});