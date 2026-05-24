package com.foodstore.ecommerce_api.domain.exception;

public class UnauthorizedException extends DomainException{
    public UnauthorizedException(String message) {
        super(message);
    }
}
