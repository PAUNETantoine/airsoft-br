import {haversineDistance} from "@/utils/haversine-distance";
import { useEffect, useRef } from "react";
import {LatLng} from "../../shared/type/types";
import {useData} from "@/contexts/datas-context";

export function usePersistentLocationUpdater(
	center: LatLng,
	radius: number,
	onUserPosChange: (pos: LatLng) => void,
	battleRoyal: boolean,
	setPlayerIsOnCircle: (isOnCircle: boolean) => void,
) {
	const datas = useData()
	const warnedRef = useRef(false)
	const centerRef = useRef(center)
	const radiusRef = useRef(radius)

	useEffect(() => {
		centerRef.current = center
		radiusRef.current = radius
	}, [center, radius])

	// Fonction locale pour afficher la notification
	function showNotification(message: string) {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker.ready.then((registration) => {
				registration.showNotification(message)
			}).catch((err) => {
				console.warn("Erreur showNotification via SW :", err)
				alert(message) // fallback
			})
		} else {
			alert(message) // fallback
		}
	}


	useEffect(() => {
		let currentPos: LatLng | null = null

		console.log("🎯 Initialisation du hook de géolocalisation")

		const id = navigator.geolocation.watchPosition(
			async (pos) => {
				currentPos = {
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				}

				fetch("/api/players", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: localStorage.getItem("nomJoueur") ?? datas.nomJoueur,
						lat: currentPos.lat,
						lng: currentPos.lng,
					}),
				})

				onUserPosChange(currentPos)

				if (battleRoyal) {
					const distance = haversineDistance(currentPos, centerRef.current)
					const isInside = distance <= radiusRef.current

					setPlayerIsOnCircle(isInside)

					if (!isInside && !warnedRef.current) {
						warnedRef.current = true
						if ("Notification" in window) {
							if (Notification.permission === "granted") {
								showNotification("🚨 Vous êtes sorti du cercle !")
							} else if (Notification.permission !== "denied") {
								Notification.requestPermission().then((permission) => {
									if (permission === "granted") {
										showNotification("🚨 Vous êtes sorti du cercle !")
									}
								})
							}
						}
					} else if (isInside) {
						warnedRef.current = false
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
			}
		)

		return () => {
			navigator.geolocation.clearWatch(id)
			console.log("🛑 Nettoyage du hook (unmount ou re-render)")
		}
	}, [battleRoyal, onUserPosChange, setPlayerIsOnCircle])
}
