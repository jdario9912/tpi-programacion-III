package com.foodstore.ecommerce_api.domain.model;

import com.foodstore.ecommerce_api.domain.exception.BusinessRuleException;
import com.foodstore.ecommerce_api.domain.exception.DomainException;
import com.foodstore.ecommerce_api.domain.model.interfaces.Base;

import java.math.BigDecimal;
import java.time.LocalDate;

public record Producto(
        Long id,
        Boolean eliminado,
        LocalDate createdAt,
        String nombre,
        BigDecimal precio,
        String descripcion,
        Integer stock,
        String imagen,
        Boolean disponible,
        Categoria categoria
) implements Base {
    public Producto {
        validateNombre(nombre);
        validatePrecio(precio);
        validateStock(stock);
        validateDescripcion(descripcion);
        if (disponible == null) disponible = true;
    }

    public static Producto create (
            String nombre,
            BigDecimal precio,
            String descripcion,
            Integer stock,
            String imagen,
            Boolean disponible,
            Categoria categoria
    ) {
        return new Producto(
                null,
                false,
                LocalDate.now(),
                nombre,
                precio,
                descripcion,
                stock,
                imagen,
                disponible,
                categoria
        );
    }

    public static Producto rehydrate (
            Long id,
            Boolean eliminado,
            LocalDate createdAt,
            String nombre,
            BigDecimal precio,
            String descripcion,
            Integer stock,
            String imagen,
            Boolean disponible,
            Categoria categoria
    ) {
        return new Producto(id, eliminado, createdAt, nombre, precio, descripcion, stock, imagen, disponible, categoria);
    }

    private void validatePrecio(BigDecimal precio) throws DomainException {
        if (precio == null) throw new BusinessRuleException("La precio es obligatorio");
        if (precio.compareTo(BigDecimal.ZERO) < 0) throw new BusinessRuleException("El precio no puede ser negativo");
    }

    private void validateStock(Integer stock) throws DomainException {
        if (stock == null) throw new BusinessRuleException("El stock es obligatorio");
        if (stock < 0) throw new BusinessRuleException("El stock no puede ser negativo");
    }

    private void validateNombre(String nombre) throws DomainException {
        if (nombre == null || nombre.trim().isEmpty())
            throw new BusinessRuleException("El nombre es obligatorio");

        String trimmed = nombre.trim();
        if (trimmed.length() < 2 || trimmed.length() > 100)
            throw new BusinessRuleException("El nombre debe tener entre 2 y 100 caracteres");
    }

    private void validateDescripcion(String descripcion) throws DomainException {
        if (descripcion != null && descripcion.trim().length() > 500)
            throw new BusinessRuleException("La descripción no puede exceder 500 caracteres");
    }
}
