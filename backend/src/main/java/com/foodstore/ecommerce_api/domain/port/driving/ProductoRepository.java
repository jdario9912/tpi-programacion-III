package com.foodstore.ecommerce_api.domain.port.driving;

import com.foodstore.ecommerce_api.domain.model.Producto;

public interface ProductoRepository extends Base<Producto> {
    Producto findByName(String name) throws RuntimeException;
}
