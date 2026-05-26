package com.foodstore.ecommerce_api.domain.port.driving;

import com.foodstore.ecommerce_api.domain.model.Pedido;

public interface PedidoRepository extends Base<Pedido> {
    Pedido findByUserId(Long id) throws RuntimeException;
}
