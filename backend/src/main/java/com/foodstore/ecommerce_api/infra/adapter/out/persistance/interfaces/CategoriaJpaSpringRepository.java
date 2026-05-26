package com.foodstore.ecommerce_api.infra.adapter.out.persistance.interfaces;

import com.foodstore.ecommerce_api.domain.model.Categoria;
import com.foodstore.ecommerce_api.infra.adapter.out.persistance.entity.CategoriaJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoriaJpaSpringRepository extends JpaRepository<CategoriaJpaEntity, Long> {
    Optional<Categoria> findByNombre(String nombre);
}
