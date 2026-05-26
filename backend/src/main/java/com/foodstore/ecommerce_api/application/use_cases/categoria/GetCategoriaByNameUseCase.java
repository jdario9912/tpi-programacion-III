package com.foodstore.ecommerce_api.application.use_cases.categoria;

import com.foodstore.ecommerce_api.application.dto.result.CategoriaResult;
import com.foodstore.ecommerce_api.domain.model.Categoria;
import com.foodstore.ecommerce_api.domain.model.interfaces.TransactionManager;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;

public class GetCategoriaByNameUseCase {
    private final CategoriaRepository categoriaRepository;
    private final TransactionManager transactionManager;

    public GetCategoriaByNameUseCase(CategoriaRepository categoriaRepository, TransactionManager transactionManager) {
        this.categoriaRepository = categoriaRepository;
        this.transactionManager = transactionManager;
    }

    public CategoriaResult execute(String name){
        return this.transactionManager.execute(()->{
            Categoria categoria = categoriaRepository.findByName(name);
            return new CategoriaResult(categoria);
        });
    }
}
