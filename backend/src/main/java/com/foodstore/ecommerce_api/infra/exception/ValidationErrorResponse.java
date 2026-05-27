package com.foodstore.ecommerce_api.infra.exception;

import java.time.LocalDateTime;
import java.util.List;

public record ValidationErrorResponse(
        int status,
        String error,
        List<FieldError> errors,
        LocalDateTime timestamp
) {
    public static ValidationErrorResponse of(List<FieldError> errors) {
        return new ValidationErrorResponse(
                400,
                "VALIDATION_ERROR",
                errors,
                LocalDateTime.now()
        );
    }

    public record FieldError(
            String field,
            Object rejectedValue,
            String message
    ) {}
}
