import {LatLng} from "../../shared/type/types";

export const haversineDistance = (coord1: LatLng, coord2: LatLng): number => {
    const R = 6371e3; // rayon de la Terre en mètres
    const toRad = (deg: number) => deg * (Math.PI / 180);
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lng - coord1.lng);
    const lat1 = toRad(coord1.lat);
    const lat2 = toRad(coord2.lat);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}