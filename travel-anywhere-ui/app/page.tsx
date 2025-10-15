"use client";

import React, {useEffect, useMemo, useRef, useState} from "react";
import {useAuthenticatedAxios} from "@/components/AuthenticatedAxios";
import ResultList from "@/components/ResultList";
import dynamic from "next/dynamic";
import {ConstValues} from "@/data/ConstValues";
import {Category, LocationData} from "@/data/types/GeoLocations.types";
import leafletTypes from "leaflet";
import {Container, Row, Col, Form, Alert} from "react-bootstrap";
import styles from "./GeoSearchForm.module.css";

export default function GeoSearchForm() {
    const axiosInstance = useAuthenticatedAxios();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [markers, setMarkers] = useState<LocationData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [categoriesToDisplay, setCategoriesToDisplay] = useState<Category[]>(ConstValues);
    const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
    const currentLocationRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
    const currentMarkerRef: React.RefObject<leafletTypes.Marker | null> = useRef<leafletTypes.Marker>(null);

    const Map = useMemo(() => dynamic(
        () => import('@/components/Map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    useEffect(() => {
        currentLocationRef.current?.scrollIntoView();
        currentMarkerRef.current?.openPopup();
    }, [selectedLocation])

    const handleSubmit = async (e: leafletTypes.LatLng) => {
        setLoading(true);
        const locations: LocationData[] = [];
        try {
            for (const location of ConstValues.values()) {
                const response = await axiosInstance.post("https://api-crt.cert.havail.sabre.com/v4/geo/search", {
                    GeoSearchRQ: {
                        GeoRef: {
                            Category: location,
                            Radius: 50,
                            UOM: "KM",
                            GeoCode: {
                                Latitude: e.lat,
                                Longitude: e.lng
                            }
                        }
                    }
                });
                locations.push(...response.data.GeoSearchRS.GeoSearchResults.GeoSearchResult.map((result: object) => ({
                    ...result,
                    Category: location
                })));
            }
            setMarkers(locations);
        } catch (exception) {
            console.log(exception)
            setShowAlert(true)
        }
        setLoading(false)
    }

    const handleFilter = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const target = e.currentTarget as HTMLInputElement;
        const value = target.value;
        if (target.checked) {
            setCategoriesToDisplay(prev => prev.includes(value as Category) ? prev : [...prev, value as Category]);
        } else {
            setCategoriesToDisplay(prev => prev.filter((category) => category !== value));
        }
    }

    return (
        <Container>
            <Row>
                <Col xs={8}>
                    <Map currentMarkerRef={currentMarkerRef} onClick={handleSubmit} zoom={13}
                         markers={markers} categories={categoriesToDisplay} selectedLocation={selectedLocation}
                         setSelected={setSelectedLocation}/>
                </Col>
                <Col xs={4} className={styles.container}>
                    <Form className={styles.locationContainer}>
                        {ConstValues.map((location) =>
                            <Form.Check inline key={`location-${location}`} label={location.toLowerCase()}
                                        defaultChecked={true}
                                        name={location.toLowerCase()} value={location}
                                        onClick={(e) => handleFilter(e)}/>)}
                    </Form>
                    {showAlert ? (
                            <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
                                <Alert.Heading>Failed to fetch locations. You may not be logged in.</Alert.Heading>
                            </Alert>
                        ) : (
                            <ResultList loading={loading} currentLocationRef={currentLocationRef}
                                     markers={markers}
                                     categories={categoriesToDisplay} selectedLocation={selectedLocation}
                                     setSelected={setSelectedLocation}/>
                    )}
                </Col>
            </Row>
        </Container>
    );
}