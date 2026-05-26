package com.foodstore.ecommerce_api.infra.config;

import com.foodstore.ecommerce_api.application.use_cases.categoria.*;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {
    @Bean
    public CreateCategoriaUseCase createCategoriaUseCase(CategoriaRepository categoriaRepository) {
        return new CreateCategoriaUseCase(categoriaRepository);
    }

    @Bean
    public GetAllCategoriasUseCase getAllCategoriasUseCase(CategoriaRepository categoriaRepository) {
        return new GetAllCategoriasUseCase(categoriaRepository);
    }

    @Bean
    public GetCategoriaByIdUseCase getCategoriaByIdUseCase(CategoriaRepository categoriaRepository) {
        return new GetCategoriaByIdUseCase(categoriaRepository);
    }

    @Bean
    public UpdateCategoriaUseCase  updateCategoriaUseCase(CategoriaRepository categoriaRepository) {
        return new UpdateCategoriaUseCase(categoriaRepository);
    }

    @Bean
    public DeleteCategoriaUseCase deleteCategoriaUseCase(CategoriaRepository categoriaRepository) {
        return new DeleteCategoriaUseCase(categoriaRepository);
    }

    @Bean
    public GetCategoriaByNameUseCase findCategoriaByNameUseCase(CategoriaRepository categoriaRepository) {
        return new GetCategoriaByNameUseCase(categoriaRepository);
    }
}
