package com.foodstore.ecommerce_api.repository;

import com.foodstore.ecommerce_api.exception.ResourceNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseRepository<T, ID> extends JpaRepository<T, ID> {
    default T findByIdOrThrow(ID id) {
        return findById(id).orElseThrow(()-> new ResourceNotFoundException("Recurso con id " + id + " no encontrado"));
    }
}