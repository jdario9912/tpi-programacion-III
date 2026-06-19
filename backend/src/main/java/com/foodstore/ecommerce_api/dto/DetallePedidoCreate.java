package com.foodstore.ecommerce_api.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record DetallePedidoCreate (
        @NotNull(message = "El id del producto es obligatorio")
        @Positive(message = "El id debe ser mayor a 0")
        Long idProducto,

        @NotNull(message = "La cantidad de productos del detalles es obligatoria")
        @Positive(message = "La cantidad de productos debe ser un número positivo")
        Integer cantidad
) {
}
