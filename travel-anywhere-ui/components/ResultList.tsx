import Location from "@/components/Location";
import {Category, LocationData} from "@/data/types/GeoLocations.types";
import React from "react";
import LoadingPanel from "@/components/LoadinPanel";
import InitialPanel from "@/components/InitialSearchPanel";
import styles from "./ResultList.module.css"

export type Props = {
    loading: boolean
    markers: LocationData[];
    categories: Category[];
    currentLocationRef: React.RefObject<HTMLDivElement | null>;
    selectedLocation: LocationData | null;
    setSelected: (marker: LocationData) => void;
};

export default function ResultList(props: Props) {
    const {markers, loading, categories, currentLocationRef, selectedLocation} = props

    if (loading) {
        return <LoadingPanel/>
    }

    if (markers.length === 0) {
        return <InitialPanel/>
    }

    return <div className={`${styles.container}`}>
        {markers && markers.filter((marker: LocationData) => categories.includes(marker.Category))
            .map((marker: LocationData) => {
                const isSelected = selectedLocation?.Id === marker.Id;
                return <Location marker={marker} {...(isSelected ? {currentLocationRef} : {})} isSelected={isSelected}
                                 setSelected={props.setSelected} key={marker.Id}/>
            })}
    </div>
}