package com.foodstore.ecommerce_api.application.dto.command;

public record CreateCategoriaCommand(
    String nombre,
    String descripcion
) {
}
