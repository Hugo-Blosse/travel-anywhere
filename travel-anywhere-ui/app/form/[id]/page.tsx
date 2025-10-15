"use client"
import { Container }from "react-bootstrap";
import React, {useState} from "react";
import {useParams} from "next/navigation";
import HotelDetails from "@/components/HotelDetails";
import HotelReservationForm, {FormDataType} from "@/components/HotelReservationForm";
import useHotelDetails from "@/app/hooks/useHotelDetails";
import {useAuthenticatedAxios} from "@/components/AuthenticatedAxios";
import { useRouter } from "next/navigation";

export default function TestForm() {
    const params = useParams();
    const router = useRouter();
    const axiosInstance = useAuthenticatedAxios();
    const {loading, error, hotelDetails} = useHotelDetails(params.id);
    const [formError,setFormError]  = useState<string|null>(null);

    const handleSubmit = async(formData: FormDataType) => {
        try {
            setFormError(null);
            const response = await axiosInstance.post("http://localhost:8080/booking", {
                ...formData,
                hotelId: params.id,
                hotelName: hotelDetails.name,
            });
            console.log(response);
            router.push("/bookings")
        }
        catch (exception) {
            setFormError("Error during booking creation.");
        }
    }

    return (
        <Container>
            <HotelDetails loading={loading} error={error} hotelDetails={hotelDetails}/>
            <HotelReservationForm error={formError} onSubmit={handleSubmit}/>
        </Container>);
}
