
export type HotelDetailsType = {
    name?: string;
    city?: string;
    address?: string;
    description?: string;
    contact?: string;
    amenities?: Amenity[];
}

export type Amenity = {
    Code: string;
    Description: string;
}