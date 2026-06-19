package com.foodstore.ecommerce_api.dto;

import java.math.BigDecimal;

public record DetallePedidoDto(
        Long id,
        Integer cantidad,
        BigDecimal subtotal,
        ProductoDto producto
) {
}
