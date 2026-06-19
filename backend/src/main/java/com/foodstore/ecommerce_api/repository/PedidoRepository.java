package com.foodstore.ecommerce_api.repository;

import com.foodstore.ecommerce_api.model.Pedido;
import org.springframework.stereotype.Repository;

@Repository
public class PedidoRepository extends BaseRepository<Pedido>{
    public PedidoRepository() {
        super(Pedido.class);
    }
}
