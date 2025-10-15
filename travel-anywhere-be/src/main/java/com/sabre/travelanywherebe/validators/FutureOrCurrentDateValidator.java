package com.sabre.travelanywherebe.validators;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

public class FutureOrCurrentDateValidator {

    public boolean isValid(String value) {
        if (value == null) {
            return true; // Null values are typically handled by @NotNull
        }
        try {
            LocalDate date = LocalDate.parse(value);
            return date.isAfter(LocalDate.now()) || date.isEqual(LocalDate.now());
        } catch (DateTimeParseException e) {
            return false; // Invalid date format
        }
    }
}