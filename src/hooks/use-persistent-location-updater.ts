// hooks/usePersistentLocationUpdater.ts
import { useEffect, useRef } from "react"
import { haversineDistance } from "@/utils/haversine-distance"
import { LatLng } from "../../shared/type/types"

export function usePersistentLocationUpdater(
	center: LatLng,
	radius: number,
	onUserPosChange: (pos: LatLng) => void,
	battleRoyal: boolean,
	setPlayerIsOnCircle: (isOnCircle: boolean) => void,
) {
	const warnedRef = useRef(false)
	const centerRef = useRef(center)
	const radiusRef = useRef(radius)

	useEffect(() => {
		centerRef.current = center
		radiusRef.current = radius
	}, [center, radius])

	useEffect(() => {
		const id = navigator.geolocation.watchPosition(
			(pos) => {
				const current: LatLng = {
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				}

				onUserPosChange(current)

				if (battleRoyal) {
					const distance = haversineDistance(
						current,
						centerRef.current,
					)
					const isInside = distance <= radiusRef.current

					setPlayerIsOnCircle(isInside)

					if (!isInside && !warnedRef.current) {
						warnedRef.current = true
						alert("🚨 Vous êtes sorti du cercle !")
						if ("Notification" in window) {
							if (Notification.permission === "granted") {
								new Notification(
									"🚨 Vous êtes sorti du cercle !",
								)
							} else if (Notification.permission !== "denied") {
								Notification.requestPermission().then(
									(permission) => {
										if (permission === "granted") {
											new Notification(
												"🚨 Vous êtes sorti du cercle !",
											)
										}
									},
								)
							}
						}
					} else if (isInside) {
						warnedRef.current = false
						setPlayerIsOnCircle(true)
					}
				}
			},
			(err) => {
				console.error("Erreur géolocalisation :", err)
			},
			{
				enableHighAccuracy: true,
				maximumAge: 0,
				timeout: Infinity,
			},
		)

		return () => {
			navigator.geolocation.clearWatch(id)
		}
	}, [battleRoyal, onUserPosChange, setPlayerIsOnCircle])
}
