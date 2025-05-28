"use client"

import React, { createContext, useContext, useState } from "react"
import {Game, Player} from "../../shared/type/types";


type dataContextType = {
    nomJoueur: string | null,
    setNomJoueur: (nom: string | null) => void,
    team: string | null,
    setTeam: (team: string | null) => void,
    players: Player[],
    setPlayers: (players: Player[]) => void,
    game: Game | null,
    setGame: (game: Game | null) => void,
}

const dataContext = createContext<dataContextType | null>(null)

export const useData = () => {
    const context = useContext(dataContext)

    if (!context) throw new Error("useData doit être utiliser dans le dataProvider")

    return context
}

export const DataProvider = ({children}: {
    children: React.ReactNode
}) => {
    const [nomJoueur, setNomJoueur] = useState<string | null>(null)

    const [team, setTeam] = useState<string | null>(null)

    const [players, setPlayers] = useState<Player[]>([])

    const [game, setGame] = useState<Game | null>(null)

    return (
        <dataContext.Provider value={{ nomJoueur, setNomJoueur, team, setTeam, players, setPlayers, game, setGame }}>
            {children}
        </dataContext.Provider>
    )
}
