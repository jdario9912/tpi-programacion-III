package com.foodstore.ecommerce_api.application.use_cases.categoria;

import com.foodstore.ecommerce_api.application.dto.result.CategoriaResult;
import com.foodstore.ecommerce_api.domain.model.Categoria;
import com.foodstore.ecommerce_api.domain.model.interfaces.TransactionManager;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;

public class GetCategoriaByIdUseCase {
    private final CategoriaRepository categoriaRepository;
    private final TransactionManager transactionManager;

    public GetCategoriaByIdUseCase(CategoriaRepository categoriaRepository, TransactionManager transactionManager) {
        this.categoriaRepository = categoriaRepository;
        this.transactionManager = transactionManager;
    }

    public CategoriaResult execute(Long id) {
        return this.transactionManager.execute(()->{
            Categoria categoria = this.categoriaRepository.findById(id);
            return  new CategoriaResult(categoria);
        });
    }
}
