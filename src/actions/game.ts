import {Game} from "../../shared/type/types";

let game: Game;

export async function getGame() {
    return game
}

export async function setGame(gameArg: Game) {
    game = gameArg
}