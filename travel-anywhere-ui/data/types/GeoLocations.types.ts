export type LocationData = {
    Id: string;
    Latitude: number;
    Longitude: number;
    Category: Category;
    City: string | undefined;
    Country: string | undefined;
    Distance: number | undefined;
    Name: string| undefined;
    Street: string | undefined;
    Zip: string | undefined;
}

export enum Category {
    HOTEL = "HOTEL",
    AIR = "AIR",
    RAIL = "RAIL",
    CAR = "CAR"
}