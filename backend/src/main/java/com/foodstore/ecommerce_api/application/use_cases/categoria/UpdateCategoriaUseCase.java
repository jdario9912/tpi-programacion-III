package com.foodstore.ecommerce_api.application.use_cases.categoria;

import com.foodstore.ecommerce_api.application.dto.command.UpdateCategoriaCommand;
import com.foodstore.ecommerce_api.application.dto.result.CategoriaResult;
import com.foodstore.ecommerce_api.domain.exception.ResourceNotFoundException;
import com.foodstore.ecommerce_api.domain.model.Categoria;
import com.foodstore.ecommerce_api.domain.model.interfaces.TransactionManager;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;

public class UpdateCategoriaUseCase {
    private final CategoriaRepository categoriaRepository;
    private final TransactionManager transactionManager;

    public UpdateCategoriaUseCase(CategoriaRepository categoriaRepository, TransactionManager transactionManager) {
        this.categoriaRepository = categoriaRepository;
        this.transactionManager = transactionManager;
    }

    public CategoriaResult execute(UpdateCategoriaCommand command) {
        return this.transactionManager.execute(()->{
            Categoria categoriaFound = this.categoriaRepository.findById(command.id());
            Categoria categoriaUpdated = this.categoriaRepository.update(
                    Categoria.rehydrate(
                            categoriaFound.id(),
                            command.eliminado() != null ? command.eliminado() : categoriaFound.eliminado(),
                            categoriaFound.createdAt(),
                            command.nombre(),
                            command.descripcion() != null ? command.descripcion() : categoriaFound.descripcion()
                    )
            );
            return new CategoriaResult(categoriaUpdated);
        });
    }
}
