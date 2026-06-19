package com.foodstore.ecommerce_api.repository;

import com.foodstore.ecommerce_api.exception.ResourceNotFoundException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor(force = true)
@Repository
public abstract class BaseRepository<T> {

    @PersistenceContext
    protected EntityManager em;

    private final Class<T> entity;

    public BaseRepository(Class<T> entity) {
        this.entity = entity;
    }

    @Transactional
    public T guardar(T entity) {
        return em.merge(entity);
    }

    public T findByIdOrThrow(Long id) {
        T found = em.find(this.entity, id);
        if (found == null) throw new ResourceNotFoundException("No se encontro " + this.entity.getSimpleName() + " con id " + id + ".");
        return found;
    }

    public List<T> listarActivos() {
        String jpql = "SELECT e FROM " + entity.getSimpleName() + " e WHERE e.eliminado = false";
        return em.createQuery(jpql, entity).getResultList();
    }

    @Transactional
    public void deleteById(Long id) {
        T found = this.findByIdOrThrow(id);
        em.remove(found);
    }
}