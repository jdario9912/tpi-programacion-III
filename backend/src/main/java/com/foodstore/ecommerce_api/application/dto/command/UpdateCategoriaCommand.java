package com.foodstore.ecommerce_api.application.dto.command;

public record UpdateCategoriaCommand (
        Long id,
        Boolean eliminado,
        String nombre,
        String descripcion
) {
}
