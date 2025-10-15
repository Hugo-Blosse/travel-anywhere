package com.sabre.travelanywherebe.validators;

import com.sabre.academy.booking.model.CreateBookingRequest;
import com.sabre.travelanywherebe.BookingController;  // Import BookingController
import com.sabre.academy.booking.model.Booking; //Import Booking model
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

public class BookingValidator {

    public static void validateCreateBookingRequest(CreateBookingRequest createBookingRequest, List<Booking> existingBookings) {
        if (createBookingRequest.getHotelId() == null || createBookingRequest.getHotelId().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Hotel ID is required");
        }
        if (createBookingRequest.getHotelName() == null || createBookingRequest.getHotelName().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Hotel Name is required");
        }

        // Validate startDate
        String startDateStr = createBookingRequest.getStartDate().toString();
        FutureOrCurrentDateValidator futureStartDateValidator = new FutureOrCurrentDateValidator();
        if (!futureStartDateValidator.isValid(startDateStr)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date must be today or in the future");
        }

        // Validate endDate
        String endDateStr = createBookingRequest.getEndDate().toString();
        FutureDateValidator futureEndDateValidator = new FutureDateValidator();
        if (!futureEndDateValidator.isValid(endDateStr)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "End date must be in the future");
        }

        // Validate that end date is after start date
        EndDateAfterStartDateValidator endDateAfterStartDateValidator = new EndDateAfterStartDateValidator();
        if (!endDateAfterStartDateValidator.isValid(startDateStr, endDateStr)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "End date must be after start date");
        }

        // Validate numberOfGuests
        if (createBookingRequest.getNumberOfGuests() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Number of guests must be greater than zero");
        }

        // Validate no booking exists for the email within the date range
        if (isBookingConflict(createBookingRequest, existingBookings)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "A booking already exists for this email within the specified date range.");
        }
    }

    private static boolean isBookingConflict(CreateBookingRequest createBookingRequest, List<Booking> existingBookings) {
        LocalDate newStartDate = LocalDate.parse(createBookingRequest.getStartDate().toString());
        LocalDate newEndDate = LocalDate.parse(createBookingRequest.getEndDate().toString());

        if(existingBookings != null) { // Added check to prevent `NullPointerException`
            for (Booking existingBooking : existingBookings) {
                if (existingBooking.getEmail().equals(createBookingRequest.getEmail())) {
                    LocalDate existingStartDate = LocalDate.parse(existingBooking.getStartDate().toString());
                    LocalDate existingEndDate = LocalDate.parse(existingBooking.getEndDate().toString());

                    // Check if the new booking overlaps with the existing booking
                    if (!(newStartDate.isAfter(existingEndDate) || newEndDate.isBefore(existingStartDate))) {
                        return true; // Conflict exists
                    }
                }
            }
        }

        return false; // No conflict
    }
}