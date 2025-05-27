"use client"

import React, { useEffect, useState } from "react"
import {
	INITIAL_RADIUS,
	SHRINK_INTERVAL,
	SHRINK_RATE,
	ZONE_1,
} from "../../../shared/const/consts-marais"
import "leaflet/dist/leaflet.css"
import { LatLng, Place, PlaceType } from "../../../shared/type/types"
import { usePersistentLocationUpdater } from "@/hooks/use-persistent-location-updater"
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import L, { LatLngExpression } from "leaflet"

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
	const [radius, setRadius] = useState<number>(INITIAL_RADIUS)
	const [lastUserPos, setLastUserPos] = useState<LatLng | null>(null)
	const [center] = useState<LatLng>(ZONE_1)

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

	usePersistentLocationUpdater(
		center,
		radius,
		(pos) => {
			setLastUserPos(pos)
		},
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
			{lastUserPos && (
				<Marker position={lastUserPos as LatLngExpression} />
			)}
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
				})}

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
