package com.foodstore.ecommerce_api.infra.adapter.out.persistance.repository;

import com.foodstore.ecommerce_api.domain.model.Categoria;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;
import com.foodstore.ecommerce_api.infra.adapter.out.persistance.entity.CategoriaJpaEntity;
import com.foodstore.ecommerce_api.infra.adapter.out.persistance.interfaces.CategoriaJpaSpringRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
public class CategoriaJpaRepository implements CategoriaRepository {
    private final CategoriaJpaSpringRepository jpaRepository;

    public CategoriaJpaRepository(CategoriaJpaSpringRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Categoria findByName(String name) throws RuntimeException {
//        return jpaRepository.findByNombre(name)
//                .map(this::toDomain)
//                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        return null;
    }

    @Override
    public Categoria create(Categoria categoria) throws RuntimeException {
        CategoriaJpaEntity entity = this.toEntity(categoria);
        CategoriaJpaEntity categoriaSaved = this.jpaRepository.save(entity);
        return toDomain(categoriaSaved);
    }

    @Override
    public ArrayList<Categoria> getAll() throws RuntimeException {
        return jpaRepository.findAll()
                .stream()
                .map(this::toDomain)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @Override
    public Categoria findById(Long id) throws RuntimeException {
        return jpaRepository.findById(id)
                .map(this::toDomain)
                .orElseThrow(() -> new EntityNotFoundException("Categoria con id " + id + " no encontrada"));
    }

    @Override
    public Categoria update(Categoria categoria) throws RuntimeException {
        CategoriaJpaEntity entity = toEntity(categoria);
        CategoriaJpaEntity saved = jpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public void delete(Long id) throws RuntimeException {
        jpaRepository.deleteById(id);
    }

    private Categoria toDomain(CategoriaJpaEntity entity) {
        return new Categoria(entity.getId(), entity.getEliminado(), entity.getCreatedAt(), entity.getNombre(), entity.getDescripcion());
    }

    private CategoriaJpaEntity toEntity(Categoria categoria) {
        return new CategoriaJpaEntity(categoria.nombre(), categoria.descripcion());
    }
}
