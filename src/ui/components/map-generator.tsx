"use client"

import React, {useCallback, useEffect, useState } from "react"
import {
	INITIAL_RADIUS,
	SHRINK_INTERVAL,
	SHRINK_RATE,
	ZONE_1,
} from "../../../shared/const/consts-marais"
import "leaflet/dist/leaflet.css"
import {LatLng, Place, PlaceType, Player} from "../../../shared/type/types"
import { usePersistentLocationUpdater } from "@/hooks/use-persistent-location-updater"
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import L, { LatLngExpression } from "leaflet"
import { useData } from "@/contexts/datas-context"

type Props = {
	places: Place[]
	disabledFilter: PlaceType[]
	battleRoyal: boolean
	setPlayerIsOnCircle: (b: boolean) => void
}

const MapGenerator = ({
						  places,
						  disabledFilter,
						  battleRoyal,
						  setPlayerIsOnCircle,
					  }: Props) => {
	const datas = useData()

	const [radius, setRadius] = useState<number>(INITIAL_RADIUS)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [lastUserPos, setLastUserPos] = useState<LatLng | null>(null)
	const [center] = useState<LatLng>(ZONE_1)

	useEffect(() => {
		const interval = setInterval(async () => {
			const res = await fetch("/api/players")
			const data: Player[] = await res.json()
			datas.setPlayers(data)
		}, 5000) // toutes les 1 sec

		return () => clearInterval(interval)
	}, [])



	useEffect(() => {
		L.Icon.Default.mergeOptions({
			iconRetinaUrl: "/leaflet/marker-icon-2x.png",
			iconUrl: "/leaflet/marker-icon.png",
			shadowUrl: "/leaflet/marker-shadow.png",
		});
	}, []);

	useEffect(() => {
		Notification.requestPermission()
	}, [])

	useEffect(() => {
		if (!center || !battleRoyal) return
		const interval = setInterval(() => {
			setRadius((r) => Math.max(0, r - SHRINK_RATE))
		}, SHRINK_INTERVAL)
		return () => clearInterval(interval)
	}, [center])

	const onUserPosChange = useCallback((pos: LatLng) => {
		setLastUserPos(pos)
	}, [])

	usePersistentLocationUpdater(
		center,
		radius,
		onUserPosChange,
		battleRoyal,
		setPlayerIsOnCircle,
	)

	if (!center) return <p>Chargement de la carte...</p>

	return (
		<MapContainer
			center={center as LatLngExpression}
			zoom={17}
			style={{ height: "100vh", width: "100%" }}
		>
			<TileLayer
				url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
				attribution="Tiles © Esri — Source : Esri, Maxar, Earthstar Geographics, and the GIS User Community"
				maxZoom={19}
			/>
			<TileLayer
				url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
				attribution="Labels © Esri"
				maxZoom={19}
				opacity={1}
			/>
			{places
				.filter((p) => !disabledFilter.includes(p.type))
				.map((place, i) => {
					const icon = L.icon({
						iconUrl: place.img,
						iconSize: [40, 40],
						iconAnchor: [20, 40],
					})

					return (
						<Marker
							key={i}
							position={{ lat: place.lat, lng: place.lng }}
							icon={icon}
						>
							<Popup>{place.name}</Popup>
						</Marker>
					)
				})
			}
			{!disabledFilter.includes("player") && datas.players.map((player, i) => (
				<Marker
					key={i}
					position={{ lat: player.lat, lng: player.lng }}
					icon={L.icon({
						iconUrl: player.name !== datas.nomJoueur ? "/player.png" : "/player_yellow.png",
						iconSize: [30, 30],
						iconAnchor: [15, 30],
					})}
				>
					<Popup>{player.name}</Popup>
				</Marker>
			))}

			{battleRoyal && (
				<Circle
					center={center as LatLngExpression}
					radius={radius}
					pathOptions={{ color: "red" }}
				/>
			)}
		</MapContainer>
	)
}

export default MapGenerator
