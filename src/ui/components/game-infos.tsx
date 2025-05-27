"use client"

import { useState } from "react"
import { Button } from "@/ui/components/button"

type Props = {
	playerIsOnCircle: boolean
	battleRoyal: boolean
}

export const GameInfos = ({ playerIsOnCircle, battleRoyal }: Props) => {
	const [teamName, setTeamName] = useState<string | null>(null)

	const handleTeamSelection = () => {
		const name = prompt("Entrez le nom de votre équipe :")
		if (name) {
			setTeamName(name)
			console.log("Équipe choisie :", name)
		}
	}

	const handleStopRequest = () => {
		console.log("Demande d'arrêt de la partie envoyée.")
	}

	if (!battleRoyal) return null

	return (
		<footer className="fixed right-0 bottom-0 left-0 z-9999 bg-slate-800 text-white shadow-lg">
			<div className="flex flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row">
				<p
					className={`text-sm lg:text-lg ${playerIsOnCircle ? "text-green-500" : "text-red-500"}`}
				>
					{playerIsOnCircle
						? "✅ Vous êtes dans le cercle"
						: "🚨 Vous êtes hors du cercle"}
				</p>

				<div className="flex flex-row gap-6">
					<Button
						onClick={handleStopRequest}
						className="bg-red-600 p-1 text-sm text-white hover:bg-red-700 lg:text-lg"
					>
						Demander l'arrêt de la partie
					</Button>
					<Button
						variant="outline"
						onClick={handleTeamSelection}
						className={"p-1 text-sm lg:text-lg"}
					>
						Choisir son équipe
					</Button>
				</div>
			</div>
			{teamName && (
				<div className="pb-2 text-center text-sm text-slate-400">
					Équipe sélectionnée :{" "}
					<span className="font-semibold">{teamName}</span>
				</div>
			)}
		</footer>
	)
}
