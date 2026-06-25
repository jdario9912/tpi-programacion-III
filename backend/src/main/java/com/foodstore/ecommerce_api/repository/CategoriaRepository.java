package com.foodstore.ecommerce_api.repository;

import com.foodstore.ecommerce_api.model.Categoria;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends BaseRepository<Categoria, Long> {
    @Query("SELECT c FROM Categoria c WHERE (c.nombre LIKE %:param% OR c.descripcion LIKE %:param%)")
    List<Categoria> findBySearchParam(@Param("param") String param);
}
