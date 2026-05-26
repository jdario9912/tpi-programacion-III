package com.foodstore.ecommerce_api.application.use_cases.categoria;

import com.foodstore.ecommerce_api.application.dto.result.CategoriaResult;
import com.foodstore.ecommerce_api.domain.model.Categoria;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;

public class UpdateCategoriaUseCase {
    private final CategoriaRepository categoriaRepository;

    public UpdateCategoriaUseCase(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public CategoriaResult execute(Categoria input) {
        Categoria categoria = this.categoriaRepository.update(input);
        return new CategoriaResult(categoria);
    }
}
