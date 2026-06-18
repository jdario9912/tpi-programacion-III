package com.foodstore.ecommerce_api.dto;

import com.foodstore.ecommerce_api.model.Categoria;

public record CategoriaDto (
    Long id,
    String nombre,
    String descripcion
) {
    public static CategoriaDto from(Categoria categoria) {
        return new CategoriaDto(
                categoria.getId(),
                categoria.getNombre(),
                categoria.getDescripcion()
        );
    }
}
