"use client"
import {Alert, Container, ListGroup} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useAuthenticatedAxios} from "@/components/AuthenticatedAxios";
import LoadingPanel from "@/components/LoadinPanel";

export type bookingType = {
    id: string
    hotelId: string
    hotelName: string
    firstName: string
    lastName: string
    birthDate: string
    email: string
    startDate: string
    endDate: string
    numberOfGuests: number
}

export default function Bookings() {
    const axiosInstance = useAuthenticatedAxios();
    const [bookings, setBookings] = useState<[bookingType] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const getBookings = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await axiosInstance.get(`http://localhost:8080/booking`);
                setBookings(response.data);
            } catch (exception) {
                console.log(exception);
                setError(true);
            }
            setLoading(false);
        }
        getBookings();
    }, []);

    if (loading) {
        return <LoadingPanel/>
    }

    if (error) {
        return <Container>
            <Alert variant="danger" show={error} onClose={() => setError(false)} dismissible>
                <Alert.Heading>Error! Can't get Bookings!</Alert.Heading>
            </Alert>
        </Container>
    }

    if (bookings.length === 0) {
        return <Container>
            <Alert variant="info" show={true}>
                <Alert.Heading>No bookings found...</Alert.Heading>
            </Alert>
        </Container>
    }

    return (
        <Container>
            <h1>Bookings</h1>
            <ListGroup>
                {bookings.map((booking) =>
                    <ListGroup.Item key={booking.id}>
                        <h6 className={"hotelName"}>{booking.hotelName}</h6>
                        <p>From {booking.startDate} to {booking.endDate}, for {booking.numberOfGuests} guests</p>
                        <p>Booked by {booking.firstName} {booking.lastName}, email: {booking.email}</p>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Container>);
}
