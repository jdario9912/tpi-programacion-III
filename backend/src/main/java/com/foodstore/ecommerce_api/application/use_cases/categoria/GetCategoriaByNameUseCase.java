package com.foodstore.ecommerce_api.application.use_cases.categoria;

import com.foodstore.ecommerce_api.application.dto.result.CategoriaResult;
import com.foodstore.ecommerce_api.domain.model.Categoria;
import com.foodstore.ecommerce_api.domain.model.interfaces.TransactionManager;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;

import java.util.List;

public class GetCategoriaByNameUseCase {
    private final CategoriaRepository categoriaRepository;
    private final TransactionManager transactionManager;

    public GetCategoriaByNameUseCase(CategoriaRepository categoriaRepository, TransactionManager transactionManager) {
        this.categoriaRepository = categoriaRepository;
        this.transactionManager = transactionManager;
    }

    public List<CategoriaResult> execute(String name){
        return this.transactionManager.execute(()->{
            List<Categoria> categorias = categoriaRepository.findByName(name);
            return categorias.stream().map(CategoriaResult::new).toList();
        });
    }
}
