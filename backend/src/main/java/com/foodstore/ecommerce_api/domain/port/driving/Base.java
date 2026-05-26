package com.foodstore.ecommerce_api.domain.port.driving;

import java.util.ArrayList;

public interface Base<T> {
    T create(T t) throws RuntimeException;
    ArrayList<T> getAll() throws RuntimeException;
    T findById(Long id) throws RuntimeException;
    T update(T t) throws RuntimeException;
    void delete(Long id) throws RuntimeException;
}
