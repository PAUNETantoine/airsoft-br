"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/ui/components/badge"
import { Play, Square, Clock, Settings } from "lucide-react"
import { Button } from "@/ui/components/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/ui/components/select";
import {Card, CardContent, CardHeader, CardTitle} from "@/ui/components/card"

export default function AdminPage() {
    const [gameActive, setGameActive] = useState(false)
    const [gameMode, setGameMode] = useState("")
    const [startTime, setStartTime] = useState<Date | null>(null)
    const [elapsedTime, setElapsedTime] = useState("00:00:00")

    const gameModes = [
        { value: "elimination", label: "Élimination" },
        { value: "capture-flag", label: "Capture du Drapeau" },
        { value: "domination", label: "Domination" },
        { value: "escort", label: "Escorte" },
        { value: "survival", label: "Survie" },
    ]

    useEffect(() => {
        let interval: NodeJS.Timeout

        if (gameActive && startTime) {
            interval = setInterval(() => {
                const now = new Date()
                const diff = now.getTime() - startTime.getTime()

                const hours = Math.floor(diff / (1000 * 60 * 60))
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((diff % (1000 * 60)) / 1000)

                setElapsedTime(
                    `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
                )
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [gameActive, startTime])

    const handleStartGame = () => {
        if (!gameMode) {
            alert("Veuillez sélectionner un mode de jeu")
            return
        }
        setGameActive(true)
        setStartTime(new Date())
        setElapsedTime("00:00:00")
    }

    const handleEndGame = () => {
        setGameActive(false)
        setStartTime(null)
        setElapsedTime("00:00:00")
    }

    return (
        <div className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                        <Settings className="h-8 w-8" />
                        PANNEAU ADMIN
                    </h1>
                    <p className="text-slate-400">Team Sheep Airsoft</p>
                </div>

                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-3">
                            <Clock className="h-5 w-5" />
                            Statut de la Partie
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300">État :</span>
                            <Badge variant={gameActive ? "default" : "secondary"} className={gameActive ? "bg-green-600" : "bg-red-600"}>
                                {gameActive ? "EN COURS" : "ARRÊTÉE"}
                            </Badge>
                        </div>

                        {gameActive && (
                            <>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-300">Mode de jeu :</span>
                                    <span className="text-white font-semibold">
                    {gameModes.find((mode) => mode.value === gameMode)?.label || "Non défini"}
                  </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-slate-300">Temps écoulé :</span>
                                    <span className="text-2xl font-mono text-green-400 font-bold">{elapsedTime}</span>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white">Contrôles de Partie</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-slate-300 text-sm font-medium">Mode de Jeu</label>
                            <Select value={gameMode} onValueChange={setGameMode} disabled={gameActive}>
                                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                    <SelectValue placeholder="Sélectionner un mode de jeu" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-700 border-slate-600">
                                    {gameModes.map((mode) => (
                                        <SelectItem key={mode.value} value={mode.value} className="text-white hover:bg-slate-600">
                                            {mode.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-4">
                            {!gameActive ? (
                                <Button
                                    onClick={handleStartGame}
                                    size="lg"
                                    className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold hover:cursor-pointer"
                                >
                                    <Play className="h-5 w-5 mr-2" />
                                    DÉMARRER LA PARTIE
                                </Button>
                            ) : (
                                <Button onClick={handleEndGame} size="lg" className="flex-1 h-12 font-semibold bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white">
                                    <Square className="h-5 w-5 mr-2" />
                                    TERMINER LA PARTIE
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {gameActive && (
                    <Card className="bg-slate-800 border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-white">Informations de Session</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-300">Heure de début :</span>
                                <span className="text-white">{startTime?.toLocaleTimeString("fr-FR")}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-300">Date :</span>
                                <span className="text-white">{startTime?.toLocaleDateString("fr-FR")}</span>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
