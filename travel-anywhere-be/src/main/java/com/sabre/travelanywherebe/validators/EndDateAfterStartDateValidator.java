package com.sabre.travelanywherebe.validators;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

public class EndDateAfterStartDateValidator {

    public boolean isValid(String startDate, String endDate) {
        if (startDate == null || endDate == null) {
            return true; // Handle null values as needed; consider them invalid if they are required.
        }

        try {
            LocalDate endDateValue = LocalDate.parse(endDate);
            LocalDate startDateValue = LocalDate.parse(startDate);

            return endDateValue.isAfter(startDateValue);

        } catch (DateTimeParseException e) {
            return false; // Invalid date format
        }
    }
}