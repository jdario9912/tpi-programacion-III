package com.foodstore.ecommerce_api.dto;

import jakarta.validation.constraints.Size;

public record CategoriaEdit(
        @Size(min = 2, max = 100, message = "El nombre de la categoria debe tener entre 2 y 100 caracteres")
        String nombre,

        @Size(max = 500, message = "La descripcion de la categoria no puede exceder 500 caracteres")
        String descripcion
) {
}
