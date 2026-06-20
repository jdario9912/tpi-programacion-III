package com.foodstore.ecommerce_api.dto;

import com.foodstore.ecommerce_api.model.enums.Estado;
import com.foodstore.ecommerce_api.model.enums.FormaPago;

public record PedidoEdit(
        Estado estado,
        FormaPago formaPago
) {
}
