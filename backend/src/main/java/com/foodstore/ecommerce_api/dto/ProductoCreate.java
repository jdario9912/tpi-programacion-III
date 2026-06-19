package com.foodstore.ecommerce_api.dto;

import jakarta.validation.constraints.*;
import jdk.jfr.BooleanFlag;

import java.math.BigDecimal;

public record ProductoCreate(
        @NotBlank(message = "El nombre del producto es obligatorio")
        @Size(min = 2, max = 100, message = "El nombre del producto debe tener entre 2 y 100 caracteres")
        String nombre,

        @NotNull(message = "El precio del producto es obligatorio")
        @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0.01")
        BigDecimal precio,

        @Size(max = 500, message = "La descripción del producto debe tener como máximo 500 caracteres")
        String descripcion,

        @NotNull(message = "El stock del producto es obigatorio")
        @PositiveOrZero(message = "El stock del producto no puede ser negativo")
        Integer stock,

        @Size(max = 500, message = "La url del producto debe tener como máximo 500 caracteres")
        String imagen,

        @BooleanFlag
        Boolean disponible,

        @NotNull(message = "El id de la categoria es obligatorio")
        @Positive(message = "El id debe ser mayor a 0")
        Long idCategoria
) {
}
