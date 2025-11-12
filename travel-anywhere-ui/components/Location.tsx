import {LocationData} from "@/data/types/GeoLocations.types";
import styles from "./Location.module.css";
import {Button, Col} from "react-bootstrap";
import React from "react";
import Link from "next/link";

export type Props = {
    marker: LocationData;
    isSelected: boolean;
    currentLocationRef?: React.RefObject<HTMLDivElement | null>;
    setSelected: (marker: LocationData) => void;
};

export default function Location(props: Props) {
    const {marker, isSelected, setSelected, currentLocationRef} = props;
    return <div onClick={() => setSelected(marker)}
                className={`location ${styles.location} ${isSelected ? styles.selected : ""}`}
                {...(currentLocationRef ? {ref: currentLocationRef} : {})} >
        < h6 className="text-lg font-semibold mb-2"> {marker.Name}</h6>
        {marker.Distance ? <p className="distance">Distance: {marker.Distance} KM</p> : null}
        {marker.Street ? <p className="address">Address: {marker.Street}</p> : null}
        {marker.Category ? <p className="category">Category: {marker.Category}</p> : null}
        {(marker.Category === "HOTEL") ?
            <Col md={2} className="order-btn d-flex align-items-center">
                <Link href={`/form/${marker.Id}`} passHref>
                    <Button variant="primary">Order</Button>
                </Link>
            </Col> : null
        }

    </div>
}