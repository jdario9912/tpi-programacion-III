package com.foodstore.ecommerce_api.application.use_cases.categoria;

import com.foodstore.ecommerce_api.application.dto.result.CategoriaResult;
import com.foodstore.ecommerce_api.domain.model.Categoria;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;

import java.util.ArrayList;
import java.util.List;

public class GetAllCategoriasUseCase {
    private final CategoriaRepository categoriaRepository;

    public GetAllCategoriasUseCase(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<CategoriaResult> execute() {
        ArrayList<Categoria> categorias = this.categoriaRepository.getAll();
        return categorias.stream().map(CategoriaResult::new).toList();
    }
}
