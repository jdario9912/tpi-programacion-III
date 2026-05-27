package com.foodstore.ecommerce_api.infra.exception;

import com.foodstore.ecommerce_api.domain.exception.BusinessRuleException;
import com.foodstore.ecommerce_api.domain.exception.ResourceNotFoundException;
import com.foodstore.ecommerce_api.domain.exception.UnauthorizedException;

import java.time.LocalDateTime;

public record ErrorResponse(
        int status,
        String error,
        String message,
        String resource,
        String field,
        Object value,
        LocalDateTime timestamp
) {
    public static ErrorResponse notFound(ResourceNotFoundException ex) {
        return new ErrorResponse(
                404,
                "NOT_FOUND",
                ex.getMessage(),
                ex.getResourceName(),
                ex.getFieldName(),
                ex.getFieldValue(),
                LocalDateTime.now()
        );
    }

    public static ErrorResponse businessRule(BusinessRuleException ex) {
        return new ErrorResponse(
                400,
                ex.getRule(),
                ex.getMessage(),
                null,
                null,
                null,
                LocalDateTime.now()
        );
    }

    public static ErrorResponse unauthorized(UnauthorizedException ex) {
        return new ErrorResponse(
                401,
                null,
                ex.getMessage(),
                null,
                null,
                null,
                LocalDateTime.now()
        );
    }

    public static ErrorResponse of(int status, String error, String message) {
        return new ErrorResponse(
                status,
                error,
                message,
                null,
                null,
                null,
                LocalDateTime.now()
        );
    }
}
