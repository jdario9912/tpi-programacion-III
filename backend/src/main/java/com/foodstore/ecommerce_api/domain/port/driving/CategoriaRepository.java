package com.foodstore.ecommerce_api.domain.port.driving;

import com.foodstore.ecommerce_api.domain.model.Categoria;

import java.util.List;

public interface CategoriaRepository extends Base<Categoria> {
    List<Categoria> findByName(String name) throws RuntimeException;
    Boolean existsById(Long id) throws RuntimeException;
}
