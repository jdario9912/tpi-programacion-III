package com.foodstore.ecommerce_api.application.use_cases.categoria;

import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;

public class DeleteCategoriaUseCase {
    private final CategoriaRepository categoriaRepository;

    public DeleteCategoriaUseCase(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public void execute(Long id){
        this.categoriaRepository.delete(id);
    }
}
