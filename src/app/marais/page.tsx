"use client"

import "leaflet/dist/leaflet.css"
import L from "leaflet"

import { MapGenerator } from "@/ui/components/map-generator"
import { useState } from "react"
import { GameMenu } from "@/ui/components/game-menu"
import { PLACES_MARAIS } from "../../../shared/const/consts-marais"
import { PlaceType } from "../../../shared/type/types"
import { GameInfos } from "@/ui/components/game-infos"

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
	iconRetinaUrl: "/leaflet/marker-icon-2x.png",
	iconUrl: "/leaflet/marker-icon.png",
	shadowUrl: "/leaflet/marker-shadow.png",
})
export default function Marais() {
	const [disabledFilter, setDisabledFilter] = useState<PlaceType[]>([])
	const [playerIsOnCircle, setPlayerIsOnCircle] = useState<boolean>(true)

	return (
		<main className="flex h-full flex-col items-center justify-center lg:gap-6">
			<GameMenu
				disabledFilter={disabledFilter}
				setDisabledFilter={setDisabledFilter}
			/>
			<MapGenerator
				places={PLACES_MARAIS}
				disabledFilter={disabledFilter}
				battleRoyal={true}
				setPlayerIsOnCircle={setPlayerIsOnCircle}
			/>
			<GameInfos playerIsOnCircle={playerIsOnCircle} battleRoyal={true} />
		</main>
	)
}
