import { haversineDistance } from "@/utils/haversine-distance";
import { useEffect, useRef, useState } from "react";
import { LatLng } from "../../shared/type/types";
import { useData } from "@/contexts/datas-context";

export function usePersistentLocationUpdater(
	center: LatLng,
	radius: number,
	onUserPosChange: (pos: LatLng) => void,
	battleRoyal: boolean,
	setPlayerIsOnCircle: (isOnCircle: boolean) => void,
) {
	const datas = useData();
	const warnedRef = useRef(false);
	const centerRef = useRef(center);
	const radiusRef = useRef(radius);
	const [watchStarted, setWatchStarted] = useState(false);

	useEffect(() => {
		centerRef.current = center;
		radiusRef.current = radius;
	}, [center, radius]);

	function showNotification(message: string) {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker.ready
				.then((registration) => {
					registration.showNotification(message);
				})
				.catch((err) => {
					console.warn("Erreur showNotification via SW :", err);
					alert(message); // fallback
				});
		} else {
			alert(message); // fallback
		}
	}

	useEffect(() => {
		let id: number;

		async function startTracking() {
			if (!("geolocation" in navigator)) {
				console.error("Géolocalisation non supportée.");
				return;
			}

			// Vérification permission
			if ("permissions" in navigator) {
				try {
					const result = await navigator.permissions.query({ name: "geolocation" as PermissionName });
					if (result.state === "denied") {
						alert("Permission de géolocalisation refusée.");
						return;
					}
				} catch (e) {
					console.warn("Impossible de lire les permissions :", e);
					// on tente quand même
				}
			}

			id = navigator.geolocation.watchPosition(
				async (pos) => {
					const currentPos: LatLng = {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
					};

					try {
						await fetch("/api/players", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								name: localStorage.getItem("nomJoueur") ?? datas.nomJoueur,
								lat: currentPos.lat,
								lng: currentPos.lng,
							}),
						});
					} catch (e) {
						console.error("Erreur envoi position au serveur :", e);
					}

					onUserPosChange(currentPos);

					if (battleRoyal) {
						const distance = haversineDistance(currentPos, centerRef.current);
						const isInside = distance <= radiusRef.current;

						setPlayerIsOnCircle(isInside);

						if (!isInside && !warnedRef.current) {
							warnedRef.current = true;
							if ("Notification" in window) {
								if (Notification.permission === "granted") {
									showNotification("🚨 Vous êtes sorti du cercle !");
								} else if (Notification.permission !== "denied") {
									Notification.requestPermission().then((permission) => {
										if (permission === "granted") {
											showNotification("🚨 Vous êtes sorti du cercle !");
										}
									});
								}
							}
						} else if (isInside) {
							warnedRef.current = false;
						}
					}
				},
				(err) => {
					console.error("Erreur géolocalisation :", err);
				},
				{
					enableHighAccuracy: true,
					maximumAge: 0,
					timeout: Infinity,
				}
			);
		}

		if (!watchStarted) {
			setWatchStarted(true);
			startTracking();
		}

		return () => {
			if (id) {
				navigator.geolocation.clearWatch(id);
				console.log("🛑 Nettoyage du hook (unmount ou re-render)");
			}
		};
	}, [battleRoyal, onUserPosChange, setPlayerIsOnCircle, datas.nomJoueur, watchStarted]);
}
