package com.foodstore.ecommerce_api.infra.adapter.out.persistance.interfaces;

import com.foodstore.ecommerce_api.infra.adapter.out.persistance.entity.CategoriaJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoriaJpaSpringRepository extends JpaRepository<CategoriaJpaEntity, Long> {
    @Query("SELECT c FROM CategoriaJpaEntity c WHERE LOWER(c.nombre) LIKE LOWER(CONCAT('%', :nombre, '%')) AND c.eliminado = false")
    List<CategoriaJpaEntity> findByNombre(@Param("nombre") String nombre);

    @Modifying
    @Query("UPDATE CategoriaJpaEntity c SET c.eliminado = true WHERE c.id = :id")
    void softDelete(@Param("id") Long id);
}
