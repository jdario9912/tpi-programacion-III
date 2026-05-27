package com.foodstore.ecommerce_api.infra.adapter.in.web.dto.request;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateCategoriaDto(
        @NotBlank
        @Size(min = 2, max = 50)
        String nombre,

        @Nullable
        Boolean eliminado,

        @Nullable
        @Size(min = 2, max = 500)
        String descripcion
) {
}
