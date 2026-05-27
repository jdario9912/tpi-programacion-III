package com.foodstore.ecommerce_api.domain.model;

import com.foodstore.ecommerce_api.domain.exception.BusinessRuleException;
import com.foodstore.ecommerce_api.domain.exception.DomainException;
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
        validateEliminado(eliminado);
        validateDescripcion(descripcion);
        validateNombre(nombre);
        validateCreatedAt(createdAt);
    }

    public static Categoria create(String nombre, String descripcion) {
        return new Categoria(null, false, LocalDate.now(), nombre.trim().toLowerCase(), descripcion.trim().toLowerCase());
    }

    public static Categoria rehydrate(Long id, Boolean eliminado, LocalDate createdAt, String nombre, String descripcion) {
        return new Categoria(id, eliminado, createdAt, nombre.trim().toLowerCase(), descripcion.trim().toLowerCase());
    }

    private void validateEliminado(Boolean eliminado) throws DomainException {
        if (eliminado == null) throw new BusinessRuleException("Categoria: eliminado", "El eliminado es obligatorio");
    }

    private void validateCreatedAt(LocalDate createdAt) throws DomainException {
        if (createdAt == null)
            throw new BusinessRuleException("Categoria: fecha de creacion", "La fecha de creacion es obligatoria");
        if (createdAt.isAfter(LocalDate.now()))
            throw new BusinessRuleException("Categoria: fecha de creacion", "La fecha de creacion no puede ser futura");
    }

    private void validateNombre(String nombre) throws DomainException {
        if (nombre == null || nombre.trim().isEmpty())
            throw new BusinessRuleException("Categoria: nombre", "El nombre es obligatorio");

        String trimmed = nombre.trim();
        if (trimmed.length() < 2 || trimmed.length() > 100)
            throw new BusinessRuleException("Categoria: nombre", "El nombre debe tener entre 2 y 100 caracteres");
    }

    private void validateDescripcion(String descripcion) throws DomainException {
        if (descripcion != null && descripcion.trim().length() > 500)
            throw new BusinessRuleException("Categoria: descripcion", "La descripción no puede exceder 500 caracteres");
    }
}
