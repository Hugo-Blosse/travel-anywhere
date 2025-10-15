import L from "leaflet";
import {Category} from "@/data/types/GeoLocations.types";

export default function CustomIcon(category: Category) {

    const iconMap: Record<Category, string> = {
        AIR: "/airplane.svg",
        CAR: "/car-rental.svg",
        HOTEL: "/hotel.svg",
        RAIL: "/train.svg",
    };

    return new L.Icon({
        iconUrl: iconMap[category] || "",
        iconSize:[24, 24],
        iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
    });
}