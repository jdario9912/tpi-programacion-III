package com.foodstore.ecommerce_api.dto;

import com.foodstore.ecommerce_api.model.enums.Estado;
import com.foodstore.ecommerce_api.model.enums.FormaPago;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public record PedidoCreate(

        Estado estado,
        FormaPago formaPago,

        @NotNull(message = "El id del usuario es obligatorio")
        @Positive(message = "El id debe ser mayor a 0")
        Long idUsuario,

        @NotEmpty(message = "El pedido debe tener al menos un detalle")
        @Valid
        List<DetallePedidoCreate> detallePedidos
) {
}
