package com.foodstore.ecommerce_api.infra.config;

import com.foodstore.ecommerce_api.application.use_cases.categoria.*;
import com.foodstore.ecommerce_api.domain.model.interfaces.TransactionManager;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {
    @Bean
    public CreateCategoriaUseCase createCategoriaUseCase(CategoriaRepository categoriaRepository, TransactionManager transactionManager) {
        return new CreateCategoriaUseCase(categoriaRepository, transactionManager);
    }

    @Bean
    public GetAllCategoriasUseCase getAllCategoriasUseCase(CategoriaRepository categoriaRepository, TransactionManager transactionManager) {
        return new GetAllCategoriasUseCase(categoriaRepository, transactionManager);
    }

    @Bean
    public GetCategoriaByIdUseCase getCategoriaByIdUseCase(CategoriaRepository categoriaRepository, TransactionManager transactionManager) {
        return new GetCategoriaByIdUseCase(categoriaRepository, transactionManager);
    }

    @Bean
    public UpdateCategoriaUseCase  updateCategoriaUseCase(CategoriaRepository categoriaRepository, TransactionManager transactionManager) {
        return new UpdateCategoriaUseCase(categoriaRepository, transactionManager);
    }

    @Bean
    public DeleteCategoriaUseCase deleteCategoriaUseCase(CategoriaRepository categoriaRepository, TransactionManager transactionManager) {
        return new DeleteCategoriaUseCase(categoriaRepository, transactionManager);
    }

    @Bean
    public GetCategoriaByNameUseCase findCategoriaByNameUseCase(CategoriaRepository categoriaRepository, TransactionManager transactionManager) {
        return new GetCategoriaByNameUseCase(categoriaRepository, transactionManager);
    }
}
