package com.foodstore.ecommerce_api.application.use_cases.categoria;

import com.foodstore.ecommerce_api.application.dto.result.CategoriaResult;
import com.foodstore.ecommerce_api.domain.model.Categoria;
import com.foodstore.ecommerce_api.domain.model.interfaces.TransactionManager;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;

import java.util.ArrayList;
import java.util.List;

public class GetAllCategoriasUseCase {
    private final CategoriaRepository categoriaRepository;
    private final TransactionManager transactionManager;

    public GetAllCategoriasUseCase(CategoriaRepository categoriaRepository, TransactionManager transactionManager) {
        this.categoriaRepository = categoriaRepository;
        this.transactionManager = transactionManager;
    }

    public List<CategoriaResult> execute() {
        return this.transactionManager.execute(()->{
            ArrayList<Categoria> categorias = this.categoriaRepository.getAll();
            return categorias.stream().map(CategoriaResult::new).toList();
        });
    }
}
