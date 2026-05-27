package com.foodstore.ecommerce_api.application.dto.result;

import com.foodstore.ecommerce_api.domain.model.Categoria;

public record CategoriaResult(
        Categoria categoria
) {
    public CategoriaResult(Categoria categoria) {
        this.categoria = categoria;
    }
}
