package com.sabre.travelanywherebe;

import com.sabre.academy.booking.model.Booking;
import com.sabre.academy.booking.model.CreateBookingRequest;
import com.sabre.travelanywherebe.validators.BookingValidator;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/booking")
public class BookingController {

    private final List<Booking> bookings = new ArrayList<>();

    @PostMapping
    public ResponseEntity<String> createBooking(@Valid @RequestBody CreateBookingRequest createBookingRequest) {
        try {
            // Validate the request
            BookingValidator.validateCreateBookingRequest(createBookingRequest, bookings);

            // Create a unique ID for the booking
            String bookingId = UUID.randomUUID().toString();

            // Create new Booking object
            Booking newBooking = new Booking();
            newBooking.setHotelId(createBookingRequest.getHotelId());
            newBooking.setHotelName(createBookingRequest.getHotelName());
            newBooking.setFirstName(createBookingRequest.getFirstName());
            newBooking.setLastName(createBookingRequest.getLastName());
            newBooking.setBirthDate(createBookingRequest.getBirthDate());
            newBooking.setEmail(createBookingRequest.getEmail());
            newBooking.setStartDate(createBookingRequest.getStartDate());
            newBooking.setEndDate(createBookingRequest.getEndDate());
            newBooking.setNumberOfGuests(createBookingRequest.getNumberOfGuests());
            newBooking.setId(bookingId);

            bookings.add(newBooking);

            return ResponseEntity.ok("Booking created successfully with ID: " + bookingId);

        }
        catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getMessage());
        }
        catch (Exception e) {
            // Handle exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create booking: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getBookings(
            @RequestParam(required = false) String name) {

        List<Booking> filteredBookings = bookings.stream()
                .filter(booking -> (name == null || booking.getFirstName().contains(name) || booking.getLastName().contains(name)))
                .collect(Collectors.toList());

        return ResponseEntity.ok(filteredBookings);
    }
}