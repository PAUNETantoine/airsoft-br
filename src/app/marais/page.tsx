"use client"

import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useState } from "react"

import { MapGenerator } from "@/ui/components/map-generator"
import { GameMenu } from "@/ui/components/game-menu"
import { GameInfos } from "@/ui/components/game-infos"
import { PLACES_MARAIS } from "../../../shared/const/consts-marais"
import { PlaceType } from "../../../shared/type/types"

export default function Marais() {
	const [disabledFilter, setDisabledFilter] = useState<PlaceType[]>([])
	const [playerIsOnCircle, setPlayerIsOnCircle] = useState<boolean>(true)

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		delete (L.Icon.Default.prototype as any)._getIconUrl

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: "/leaflet/marker-icon-2x.png",
			iconUrl: "/leaflet/marker-icon.png",
			shadowUrl: "/leaflet/marker-shadow.png",
		})
	}, [])

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
			<GameInfos
				playerIsOnCircle={playerIsOnCircle}
				battleRoyal={true}
			/>
		</main>
	)
}
