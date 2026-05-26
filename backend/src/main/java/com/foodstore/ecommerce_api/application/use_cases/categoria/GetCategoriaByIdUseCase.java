package com.foodstore.ecommerce_api.application.use_cases.categoria;

import com.foodstore.ecommerce_api.application.dto.result.CategoriaResult;
import com.foodstore.ecommerce_api.domain.model.Categoria;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;

public class GetCategoriaByIdUseCase {
    private final CategoriaRepository categoriaRepository;

    public GetCategoriaByIdUseCase(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public CategoriaResult execute(Long id) {
        Categoria categoria = this.categoriaRepository.findById(id);
        return  new CategoriaResult(categoria);
    }
}
