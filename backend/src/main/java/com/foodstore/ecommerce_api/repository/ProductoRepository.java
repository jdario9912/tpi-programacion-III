package com.foodstore.ecommerce_api.repository;

import com.foodstore.ecommerce_api.model.Producto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends BaseRepository<Producto, Long> {
    @Query("SELECT p FROM Producto p WHERE p.categoria.id = :idCategoria")
    List<Producto> buscarPorCategoria(@Param("idCategoria") Long idCategoria);
}
