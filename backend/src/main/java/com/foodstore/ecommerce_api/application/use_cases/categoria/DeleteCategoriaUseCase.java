package com.foodstore.ecommerce_api.application.use_cases.categoria;

import com.foodstore.ecommerce_api.domain.exception.ResourceNotFoundException;
import com.foodstore.ecommerce_api.domain.model.interfaces.TransactionManager;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;

public class DeleteCategoriaUseCase {
    private final CategoriaRepository categoriaRepository;
    private final TransactionManager transactionManager;

    public DeleteCategoriaUseCase(CategoriaRepository categoriaRepository, TransactionManager transactionManager) {
        this.categoriaRepository = categoriaRepository;
        this.transactionManager = transactionManager;
    }

    public void execute(Long id){
        this.transactionManager.execute(()-> {
            if (!categoriaRepository.existsById(id)) throw new ResourceNotFoundException("Categoria", "Categoria con id " + id + " no existe", id);
            this.categoriaRepository.delete(id);
        });
    }
}
