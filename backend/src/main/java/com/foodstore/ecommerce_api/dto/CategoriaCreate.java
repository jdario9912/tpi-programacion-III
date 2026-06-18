package com.foodstore.ecommerce_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoriaCreate(
        @NotBlank(message = "El nombre de la categoria es obligatorio")
        @Size(min = 2, max = 50, message = "El nombre de la categoria debe tener entre 2 y 100 caracteres")
        String nombre,

        @Size(max = 500, message = "La descripcion de la categoria no puede exceder 500 caracteres")
        String descripcion
) {}
