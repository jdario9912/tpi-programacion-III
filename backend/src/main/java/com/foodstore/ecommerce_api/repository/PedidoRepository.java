package com.foodstore.ecommerce_api.repository;

import com.foodstore.ecommerce_api.model.Pedido;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends BaseRepository<Pedido, Long>{
    @Query("SELECT p FROM Usuario u JOIN u.pedidos p WHERE u.id = :usuarioId")
    List<Pedido> findByUsuarioId(@Param("usuarioId") Long usuarioId);
}
