package com.foodstore.ecommerce_api.dto;

import com.foodstore.ecommerce_api.model.Producto;

import java.math.BigDecimal;

public record ProductoDto(
        Long id,
        String nombre,
        BigDecimal precio,
        String descripcion,
        Integer stock,
        String imagen,
        Boolean disponible,
        CategoriaDto categoria
) {
    public static ProductoDto from (Producto producto) {
        return new ProductoDto(
                producto.getId(),
                producto.getNombre(),
                producto.getPrecio(),
                producto.getDescripcion(),
                producto.getStock(),
                producto.getImagen(),
                producto.getDisponible(),
                new CategoriaDto(
                        producto.getCategoria().getId(),
                        producto.getCategoria().getNombre(),
                        producto.getCategoria().getDescripcion()
                )
        );
    }
}
