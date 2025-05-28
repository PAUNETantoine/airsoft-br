import { NextRequest, NextResponse } from "next/server"
import { Player } from "../../../../shared/type/types"

const players: (Player & { lastUpdate: number })[] = []

const TIMEOUT_MS = 30 * 1000 // 30 secondes

export async function GET() {
    const now = Date.now()

    // Supprimer les joueurs inactifs
    for (let i = players.length - 1; i >= 0; i--) {
        if (now - players[i].lastUpdate > TIMEOUT_MS) {
            players.splice(i, 1)
        }
    }

    // Retourner uniquement les joueurs actifs (sans lastUpdate)
    return NextResponse.json(players.map(({ ...p }) => p))
}

export async function POST(req: NextRequest) {
    const player = (await req.json()) as Player
    const now = Date.now()

    const i = players.findIndex(p => p.name === player.name)

    if (i !== -1) {
        players[i] = { ...player, lastUpdate: now }
    } else {
        players.push({ ...player, lastUpdate: now })
    }

    return NextResponse.json({ status: "ok" })
}
