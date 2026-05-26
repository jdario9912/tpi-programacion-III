package com.foodstore.ecommerce_api.domain.model.interfaces;

import java.util.function.Supplier;

public interface TransactionManager {
    <T> T execute(Supplier<T> operation);
    void execute(Runnable operation);
}
