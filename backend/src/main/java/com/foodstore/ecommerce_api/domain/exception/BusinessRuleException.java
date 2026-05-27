package com.foodstore.ecommerce_api.domain.exception;

public class BusinessRuleException extends DomainException{
    private final String rule;

    public BusinessRuleException(String rule, String message) {
        super(message);
        this.rule = rule;
    }

    public String getRule() {
        return rule;
    }
}
