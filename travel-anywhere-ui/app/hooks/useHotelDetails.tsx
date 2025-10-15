import {useAuthenticatedAxios} from "@/components/AuthenticatedAxios";
import {useEffect, useState} from "react";
import {ParamValue} from "next/dist/server/request/params";
import {HotelDetailsType} from "@/data/types/HotelDetails.types";


export default function useHotelDetails(id: ParamValue){
    const axiosInstance = useAuthenticatedAxios();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<String | null>(null);
    const [hotelDetails, setHotelDetails] = useState<HotelDetailsType>({});

    useEffect(() => {
        const getDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.post("https://api-crt.cert.havail.sabre.com/v4.0.0/get/hoteldescriptiveinfo", {
                    GetHotelDescriptiveInfoRQ: {
                        POS: {
                            Source: {
                                PseudoCityCode: "7YML"
                            }
                        },
                        HotelRefs: {
                            HotelRef: {
                                HotelCode: id,
                                CodeContext: "GLOBAL"
                            }
                        },
                        DescriptiveInfoRef: {
                            "PropertyInfo": true,
                            "LocationInfo": true,
                            "Amenities": true,
                            Descriptions: {
                                Description: [
                                    {
                                        Type: "ShortDescription"
                                    }
                                ]
                            },
                            "SecurityFeatures": true
                        }
                    }
                });
                const hotelInfo = response.data.GetHotelDescriptiveInfoRS?.HotelDescriptiveInfos?.HotelDescriptiveInfo;
                setHotelDetails({
                    name: hotelInfo?.HotelInfo?.HotelName,
                    city: hotelInfo?.LocationInfo?.Address?.CityName?.value,
                    address: hotelInfo?.LocationInfo?.Address?.AddressLine1,
                    description: hotelInfo?.Descriptions?.Description[0]?.Text?.value,
                    contact: hotelInfo?.LocationInfo?.Contact?.Phone,
                    amenities: hotelInfo?.Amenities?.Amenity
                });
            } catch (exception) {
                console.log(exception)
                setError("error during fetching hotel details");
            }
            setLoading(false);
        };
        getDetails();
    }, [id]);

    return { loading, hotelDetails , error};
};