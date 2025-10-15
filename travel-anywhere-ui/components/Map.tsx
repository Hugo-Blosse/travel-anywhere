import {MapContainer, Marker, Popup, TileLayer, useMapEvent} from "react-leaflet"
import styles from "./Map.module.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"
import "leaflet/dist/leaflet.css"
import {Category, LocationData} from "@/data/types/GeoLocations.types";
import CustomIcon from "@/components/CustomIcon";
import React from "react";
import leafletTypes from "leaflet";
import {InitialLocation} from "@/data/ConstValues";

export type MapClickHandlerProps = {
    onClick: (latlng: leafletTypes.LatLng) => void;
};

function MapClickHandler(props: MapClickHandlerProps) {
    const {onClick} = props;
    useMapEvent("click", (e) => {
        onClick(e.latlng);
    });
    return null;
}

export type MyMapProps = {
    currentMarkerRef: React.RefObject<leafletTypes.Marker | null> | undefined;
    onClick: (latlng: leafletTypes.LatLng) => void;
    zoom: number;
    markers: LocationData[];
    categories: Category[];
    selectedLocation: LocationData | null;
    setSelected: (marker: LocationData) => void;

};

export default function MyMap(props: MyMapProps) {
    const {zoom, markers, onClick, categories, currentMarkerRef, selectedLocation} = props
    const [searchPoint, setSearchPoint] = React.useState<leafletTypes.LatLng | null>(null);

    return <MapContainer className={styles.map} center={InitialLocation} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onClick={latlng => {
            setSearchPoint(latlng);
            onClick(latlng)
        }}/>
        {searchPoint &&
            <Marker position={[searchPoint.lat, searchPoint.lng]}></Marker>
        }
        {markers && markers.filter((marker: LocationData) => categories.includes(marker.Category)).map((marker: LocationData) => {
            const markerSelected = selectedLocation?.Id === marker.Id;
            return <Marker icon={CustomIcon(marker.Category)}
                           key={marker.Id} {...(markerSelected ? {ref: currentMarkerRef} : {})}
                           position={[marker.Latitude, marker.Longitude]} eventHandlers={{
                click: () => props.setSelected(marker),
            }}>
                <Popup>
                    {marker.Name}
                </Popup>
            </Marker>
        })}
    </MapContainer>
}