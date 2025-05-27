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
