package com.foodstore.ecommerce_api.domain.port.driving;

import com.foodstore.ecommerce_api.domain.model.DetallePedido;

public interface DetallePedidoRepository extends Base<DetallePedido> {
    DetallePedido findByPedidoId(Long id) throws RuntimeException;
}
