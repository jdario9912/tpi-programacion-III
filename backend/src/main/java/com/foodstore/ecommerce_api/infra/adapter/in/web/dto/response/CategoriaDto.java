package com.foodstore.ecommerce_api.infra.adapter.in.web.dto.response;

import com.foodstore.ecommerce_api.application.dto.result.CategoriaResult;

public record CategoriaDto(
        CategoriaResult categoriaResult
) {
    public CategoriaDto(CategoriaResult categoriaResult) {
        this.categoriaResult = categoriaResult;
    }
}
