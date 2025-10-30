package com.sabre.travelanywherebe.scenarios;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;

import org.testng.annotations.Test;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

public class BookingApiTests {

    @Test
    public void testCreateBookingHappyPath() {
        String requestBody = "{\n" +
                             "  \"hotelId\": \"100126882\",\n" +
                             "  \"hotelName\": \"Studio Krakow Lea by Renters\",\n" +
                             "  \"firstName\": \"Sabre\",\n" +
                             "  \"lastName\": \"Academy\",\n" +
                             "  \"birthDate\": \"2025-06-10\",\n" +
                             "  \"email\": \"academy@sabre.com\",\n" +
                             "  \"startDate\": \"2025-12-16\",\n" +
                             "  \"endDate\": \"2025-12-26\",\n" +
                             "  \"numberOfGuests\": 2\n" +
                             "}";
        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .body(requestBody)
                .post("http://localhost:8080/booking");
        assertEquals(200, response.getStatusCode());
        assertTrue(response.getBody().asString().contains("Booking created successfully"));
    }

    @Test
    public void testGetBookings() {
        Response response = RestAssured.get("http://localhost:8080/booking");
        assertEquals(200, response.getStatusCode());
    }
}
