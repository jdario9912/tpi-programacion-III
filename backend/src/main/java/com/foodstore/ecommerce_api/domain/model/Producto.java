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
        Double precio,
        String descripcion,
        Integer stock,
        String imagen,
        Boolean disponible,
        Categoria categoria
) implements Base {
    public Producto {
        validateEliminado(eliminado);
        validateCreatedAt(createdAt);
        validateNombre(nombre);
        validatePrecio(precio);
        validateStock(stock);
        validateDescripcion(descripcion);
        if (disponible == null) disponible = true;
    }

    public static Producto create (
            String nombre,
            Double precio,
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
            Double precio,
            String descripcion,
            Integer stock,
            String imagen,
            Boolean disponible,
            Categoria categoria
    ) {
        return new Producto(id, eliminado, createdAt, nombre, precio, descripcion, stock, imagen, disponible, categoria);
    }

    private void validateEliminado(Boolean eliminado) throws DomainException {
        if (eliminado == null) throw new BusinessRuleException("Producto: eliminado", "El eliminado es obligatorio");
    }

    private void validateCreatedAt(LocalDate createdAt) throws DomainException {
        if (createdAt == null)
            throw new BusinessRuleException("Pedido: fecha de creacion", "La fecha de creacion es obligatoria");
        if (createdAt.isAfter(LocalDate.now()))
            throw new BusinessRuleException("Pedido: fecha de creacion", "La fecha de creacion no puede ser futura");
    }

    private void validatePrecio(Double precio) throws DomainException {
        if (precio == null) throw new BusinessRuleException("Pedido: precio", "La precio es obligatorio");
        if (precio < 0.00) throw new BusinessRuleException("Pedido: precio", "El precio no puede ser negativo");
    }

    private void validateStock(Integer stock) throws DomainException {
        if (stock == null) throw new BusinessRuleException("Pedido: stock", "El stock es obligatorio");
        if (stock < 0) throw new BusinessRuleException("Pedido: stock", "El stock no puede ser negativo");
    }

    private void validateNombre(String nombre) throws DomainException {
        if (nombre == null || nombre.trim().isEmpty())
            throw new BusinessRuleException("Pedido: nombre", "El nombre es obligatorio");

        String trimmed = nombre.trim();
        if (trimmed.length() < 2 || trimmed.length() > 100)
            throw new BusinessRuleException("Pedido: nombre", "El nombre debe tener entre 2 y 100 caracteres");
    }

    private void validateDescripcion(String descripcion) throws DomainException {
        if (descripcion != null && descripcion.trim().length() > 500)
            throw new BusinessRuleException("Pedido: descripcion", "La descripción no puede exceder 500 caracteres");
    }
}
