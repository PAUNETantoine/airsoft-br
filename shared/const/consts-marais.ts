import { LatLng, Place } from "../type/types"

export const INITIAL_RADIUS = 200
export const SHRINK_RATE = 5
export const SHRINK_INTERVAL = 10000

export const ZONE_1: LatLng = {
	lat: 49.28988923532759,
	lng: -0.5065635750403635,
}

const FORT_APPLE_TREE: Place = {
	name: "Base des pommiers",
	lat: 49.290389803537906,
	lng: -0.5043096215211536,
	img: "/castle_red.png",
	type: "base",
}

const FORT_FENCE: Place = {
	name: "Base du portail",
	lat: 49.28944359229037,
	lng: -0.5048024812411263,
	img: "/castle_blue.png",
	type: "base",
}

const FAISAN_TREE: Place = {
	name: "Arbre aux faisans",
	lat: 49.28969097743212,
	lng: -0.507465330691829,
	img: "/castle_green.png",
	type: "base",
}

const TRENCH: Place = {
	name: "Trenché des deux marais",
	lat: 49.29009843614544,
	lng: -0.5063568824182245,
	img: "/warning.png",
	type: "place",
}

const LACK: Place = {
	name: "L'étang",
	lat: 49.289649038711524,
	lng: -0.5060135978994517,
	img: "/water.png",
	type: "place",
}

const BIG_TREE: Place = {
	name: "Le grand chêne",
	lat: 49.28938803843477,
	lng: -0.5069063780318613,
	img: "/tree.png",
	type: "place",
}

const SMALL_BRIDGE: Place = {
	name: "Le petit pont",
	lat: 49.289533763593475,
	lng: -0.5053197148219594,
	img: "/bridge.png",
	type: "place",
}

const CABANE: Place = {
	name: "La cabane",
	lat: 49.28935605472705,
	lng: -0.5055769989780305,
	img: "/castle_yellow.png",
	type: "base",
}

const RAGONDINS_RIVE: Place = {
	name: "La rive aux ragondins",
	lat: 49.290577052308926,
	lng: -0.507273105070046,
	img: "/paddling.png",
	type: "place",
}

const FAR_GATE: Place = {
	name: "La barrière lointaine",
	lat: 49.290220792505565,
	lng: -0.5083136946301537,
	img: "/fence.png",
	type: "place",
}

const SHEEP_BRIDGE: Place = {
	name: "Le sheep bridge",
	lat: 49.28884863421254,
	lng: -0.5063503657683768,
	img: "/bridge.png",
	type: "place",
}

const DEAD_TREE: Place = {
	name: "L'arbre mort",
	lat: 49.2893811946495,
	lng: -0.5088132504084236,
	img: "/tree.png",
	type: "place",
}

export const PLACES_MARAIS: Place[] = [
	FORT_APPLE_TREE,
	FORT_FENCE,
	FAISAN_TREE,
	TRENCH,
	LACK,
	BIG_TREE,
	SMALL_BRIDGE,
	CABANE,
	RAGONDINS_RIVE,
	FAR_GATE,
	SHEEP_BRIDGE,
	DEAD_TREE,
]
