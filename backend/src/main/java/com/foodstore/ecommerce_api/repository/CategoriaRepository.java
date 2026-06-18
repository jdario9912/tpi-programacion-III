package com.foodstore.ecommerce_api.repository;

import com.foodstore.ecommerce_api.model.Categoria;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoriaRepository extends BaseRepository<Categoria> {
    public CategoriaRepository() {
        super(Categoria.class);
    }

    public List<Categoria> findBySearchParam(String param) {
        String jpql = "SELECT e FROM " + Categoria.class.getSimpleName() + " e WHERE e.nombre LIKE :param OR e.descripcion LIKE :param AND e.eliminado = false";
        return em.createQuery(jpql, Categoria.class)
                .setParameter("param", "%" + param + "%")
                .getResultList();
    }
}
