package com.foodstore.ecommerce_api.application.use_cases.categoria;

import com.foodstore.ecommerce_api.application.dto.result.CategoriaResult;
import com.foodstore.ecommerce_api.domain.model.Categoria;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;

public class GetCategoriaByNameUseCase {
    private final CategoriaRepository categoriaRepository;

    public GetCategoriaByNameUseCase(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public CategoriaResult execute(String name){
        Categoria categoria = categoriaRepository.findByName(name);
        return new CategoriaResult(categoria);
    }
}
