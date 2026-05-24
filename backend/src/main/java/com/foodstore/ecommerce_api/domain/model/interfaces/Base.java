package com.foodstore.ecommerce_api.domain.model.interfaces;

import java.time.LocalDate;

public interface Base {
    Long id();
    Boolean eliminado();
    LocalDate createdAt();
}
