import {Alert, Card, Col, ListGroup, Row} from "react-bootstrap";
import React from "react";
import LoginPanel from "@/components/LoginPanel";
import {HotelDetailsType} from "@/data/types/HotelDetails.types";
import styles from "./HotelDetails.module.css"

export type Props = {
    loading: boolean;
    error: String | null;
    hotelDetails: HotelDetailsType;
};

export default function HotelDetails(props: Props) {
    const {error, loading, hotelDetails} = props;

    if (loading) {
        return <LoginPanel/>
    }

    if (error != null) {
        return <Alert variant="danger" show={true} dismissible>
            <Alert.Heading>Error! Failed to fetch hotel details</Alert.Heading>
        </Alert>
    }

    return <Card className="mb-4">
        <Row>
            <Card.Body>
                <Row>
                    <Col md={8}>
                        <Card.Title className="hotelName">{hotelDetails.name}</Card.Title>
                        <Card.Text>
                            {hotelDetails.city && (<><strong>City:</strong> {hotelDetails.city}<br/></>)}
                            {hotelDetails.address && (<><strong>Address:</strong> {hotelDetails.address}<br/></>)}
                            {hotelDetails.contact && (<><strong>Address:</strong> {hotelDetails.contact}<br/></>)}
                            {hotelDetails.description && (<>
                                <strong>Description:</strong> {hotelDetails.description}</>)}
                        </Card.Text>
                    </Col>
                    <Col md={4}>
                        <Card.Title> Amenities</Card.Title>
                        <ListGroup className={styles.Amenities}>
                            {hotelDetails?.amenities?.map((amenity) => (
                                <ListGroup.Item key={`id-${amenity.Code}`}>
                                    {amenity.Description}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Row>
    </Card>
}