"use client"

import dynamic from "next/dynamic"
import {useEffect, useState} from "react"

import { GameMenu } from "@/ui/components/game-menu"
import { GameInfos } from "@/ui/components/game-infos"
import { PLACES_MARAIS } from "../../../shared/const/consts-marais"
import { PlaceType } from "../../../shared/type/types"

const MapGenerator = dynamic(() => import("@/ui/components/map-generator"), {
	ssr: false,
})

export default function Marais() {
	const [tracking, setTracking] = useState(false)
	const [disabledFilter, setDisabledFilter] = useState<PlaceType[]>([])
	const [playerIsOnCircle, setPlayerIsOnCircle] = useState<boolean>(true)

	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker.register("/sw.js").then(() => {
				console.log("✅ Service Worker enregistré")
			}).catch((err) => {
				console.error("❌ Erreur SW :", err)
			})
		}
	}, [])


	return (
		<main className="flex h-full flex-col items-center justify-center lg:gap-6">
			<GameMenu
				disabledFilter={disabledFilter}
				setDisabledFilter={setDisabledFilter}
			/>
			{!tracking && <button onClick={() => setTracking(true)} className={"border-b p-2 text-white items-center justify-center text-2xl hover:cursor-pointer bg-green-600 rounded-lg"}>Activer la map intéractive</button>}
			{tracking && (
				<MapGenerator
				places={PLACES_MARAIS}
				disabledFilter={disabledFilter}
				battleRoyal={true}
				setPlayerIsOnCircle={setPlayerIsOnCircle}
			/>
			)}
			<GameInfos
				playerIsOnCircle={playerIsOnCircle}
				battleRoyal={true}
			/>
		</main>
	)
}
