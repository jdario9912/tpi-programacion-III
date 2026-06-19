package com.foodstore.ecommerce_api.repository;

import com.foodstore.ecommerce_api.model.Producto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductoRepository extends BaseRepository<Producto> {
    public ProductoRepository() {
        super(Producto.class);
    }

    public List<Producto> buscarPorCategoria(Long idCategoria) {
        return em.createNamedQuery("Producto.buscarPorCategoria", Producto.class).setParameter("idCategoria", idCategoria).getResultList();
    }
}
