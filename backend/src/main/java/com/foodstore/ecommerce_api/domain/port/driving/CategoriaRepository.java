package com.foodstore.ecommerce_api.domain.port.driving;

import com.foodstore.ecommerce_api.domain.model.Categoria;

public interface CategoriaRepository extends Base<Categoria> {
    Categoria findByName(String name) throws RuntimeException;
}
