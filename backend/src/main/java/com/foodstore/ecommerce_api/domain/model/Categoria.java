package com.foodstore.ecommerce_api.domain.model;

import com.foodstore.ecommerce_api.domain.exception.BusinessRuleException;
import com.foodstore.ecommerce_api.domain.model.interfaces.Base;

import java.time.LocalDate;

public record Categoria(
        Long id,
        Boolean eliminado,
        LocalDate createdAt,
        String nombre,
        String descripcion
) implements Base {
    public Categoria {
        validateDescripcion(descripcion);
        validateNombre(nombre);
        validateCreatedAt(createdAt);
    }

    public static Categoria create(String nombre, String descripcion) {
        return new Categoria(null, false, LocalDate.now(), nombre, descripcion);
    }

    public static Categoria rehydrate(Long id, Boolean eliminado, LocalDate createdAt, String nombre, String descripcion) {
        return new Categoria(id, eliminado, createdAt, nombre, descripcion);
    }

    private void validateCreatedAt(LocalDate createdAt) {
        if (createdAt == null)
            throw new BusinessRuleException("La fecha de creacion es obligatoria");
        if (createdAt.isAfter(LocalDate.now()))
            throw new BusinessRuleException("La fecha de creacion no puede ser futura");
    }

    private void validateNombre(String nombre) {
        if (nombre == null || nombre.trim().isEmpty())
            throw new BusinessRuleException("El nombre es obligatorio");

        String trimmed = nombre.trim();
        if (trimmed.length() < 2 || trimmed.length() > 100)
            throw new BusinessRuleException("El nombre debe tener entre 2 y 100 caracteres");
    }

    private void validateDescripcion(String descripcion) {
        if (descripcion != null && descripcion.trim().length() > 500)
            throw new BusinessRuleException("La descripción no puede exceder 500 caracteres");
    }
}
