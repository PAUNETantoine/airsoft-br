import {Player} from "../../shared/type/types";

let players: Player[] = [];

export async function getPlayers() {
    return players;
}

export async function setPlayers(playersArg: Player[]) {
    players = players.concat(playersArg);
}

export async function addPlayer(player: Player) {
    players.push(player);
}

export async function removePlayer(playerArg: Player) {
    players = players.filter((player) => player.name !== playerArg.name);
}