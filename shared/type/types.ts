export type LatLng = {
	lat: number
	lng: number
}

export type Place = {
	lat: number
	lng: number
	name: string
	img: string
	type: PlaceType
}

export type PlaceType = "base" | "place" | "player" | "flag"

export type Player = {
	name: string
	lat: number
	lng: number
}

export type Game = {
	type: "elimination" | "capture-flag" | "domination" | "escort" | "survival"
	started: boolean
	time: number
	zoneRad: number
	zoneLat: number
	zoneLng: number
}