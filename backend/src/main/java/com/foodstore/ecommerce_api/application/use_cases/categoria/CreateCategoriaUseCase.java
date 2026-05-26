package com.foodstore.ecommerce_api.application.use_cases.categoria;

import com.foodstore.ecommerce_api.application.dto.command.CreateCategoriaCommand;
import com.foodstore.ecommerce_api.application.dto.result.CategoriaResult;
import com.foodstore.ecommerce_api.domain.model.Categoria;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;

public class CreateCategoriaUseCase {
    private final CategoriaRepository categoriaRepository;

    public CreateCategoriaUseCase(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public CategoriaResult execute (CreateCategoriaCommand command) {
        Categoria categoria = this.categoriaRepository.create(Categoria.create(command.nombre(), command.descripcion()));
        return new CategoriaResult(categoria);
    }
}
