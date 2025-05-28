"use client"

import {useEffect, useState} from "react"
import { MapPin, Clock, User, Users } from "lucide-react"
import {Button} from "@/ui/components/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/ui/components/card";
import { Input } from "@/ui/components/input";
import {useData} from "@/contexts/datas-context";
import {useRouter} from "next/navigation";

export default function HomePage() {
	const datas = useData()
	const [isConnected, setIsConnected] = useState(false)
	const router = useRouter()


	useEffect(() => {
		const nomjoueur = localStorage.getItem("nomJoueur")
		const team = localStorage.getItem("team")


		if(nomjoueur) datas.setNomJoueur(nomjoueur)

		if(team) datas.setTeam(team)

		if(nomjoueur && team) setIsConnected(true)
	}, [])



	const handleMapSelect = (mapName: string) => {
		if (!isConnected) {
			alert("Veuillez vous connecter avant de rejoindre une partie")
			return
		}

		if (mapName === "Marais") {
			router.push("/marais")
		} else {
			console.log("Map pas encore disponible")
		}
	}

	const handleConnect = () => {
		if (datas.team && datas.nomJoueur && (!datas.nomJoueur.trim() || !datas.team.trim())) {
			alert("Veuillez remplir votre pseudo et votre équipe")
			return
		}
		setIsConnected(true)
		localStorage.setItem("nomJoueur", datas.nomJoueur ? datas.nomJoueur : "")
		localStorage.setItem("team", datas.team ? datas.team : "")

		console.log(`Joueur connecté: ${datas.nomJoueur} - Équipe: ${datas.team}`)
	}

	const handleDisconnect = () => {
		setIsConnected(false)
		datas.setNomJoueur(null)
		datas.setTeam(null)
	}

	return (
		<div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center space-y-2">
					<h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">TEAM SHEEP</h1>
					<p className="text-xl md:text-2xl text-slate-300 font-medium">AIRSOFT</p>
				</div>

				{/* Section Connexion Joueur */}
				<Card className="bg-slate-800 border-slate-700">
					<CardHeader>
						<CardTitle className="text-white flex items-center gap-2">
							<User className="h-5 w-5" />
							{isConnected ? "Connecté" : "Connexion Joueur"}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{!isConnected ? (
							<>
								<div className="space-y-2">
									<Input
										value={datas.nomJoueur ? datas.nomJoueur : ""}
										onChange={(e) => datas.setNomJoueur(e.target.value)}
										placeholder="Votre pseudo"
										className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
									/>
								</div>
								<div className="space-y-2">
									<Input
										value={datas.team ? datas.team : ""}
										onChange={(e) => datas.setTeam(e.target.value)}
										placeholder="Votre équipe"
										className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
									/>
								</div>
								<Button onClick={handleConnect} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
									<Users className="h-4 w-4 mr-2" />
									Se Connecter
								</Button>
							</>
						) : (
							<div className="space-y-3">
								<div className="text-center">
									<div className="flex items-center justify-center gap-2 mb-2">
										<div className="w-2 h-2 bg-green-400 rounded-full"></div>
										<span className="text-green-400 font-medium">Connecté</span>
									</div>
									<p className="text-white font-semibold">{datas.nomJoueur}</p>
									<p className="text-slate-400">Équipe: {datas.team}</p>
								</div>
								<Button
									onClick={handleDisconnect}
									variant="outline"
									className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
								>
									Se Déconnecter
								</Button>
							</div>
						)}
					</CardContent>
				</Card>

				<div className="flex flex-col gap-4">
					<Button
						onClick={() => handleMapSelect("Marais")}
						size="lg"
						disabled={!isConnected}
						className={`h-16 px-8 text-lg font-semibold flex items-center gap-3 ${
							isConnected
								? "bg-green-600 hover:bg-green-700 text-white"
								: "bg-slate-700 text-slate-500 cursor-not-allowed"
						}`}
					>
						<MapPin className="h-6 w-6" />
						MAP MARAIS
					</Button>

					<Button
						size="lg"
						disabled
						className="h-16 px-8 text-lg font-semibold border-slate-600 text-slate-400 bg-slate-700 cursor-not-allowed flex items-center gap-3"
					>
						<Clock className="h-6 w-6" />
						ARRIVE BIENTÔT...
					</Button>
				</div>
			</div>
		</div>
	)
}
