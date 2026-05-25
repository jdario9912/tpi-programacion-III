package com.foodstore.ecommerce_api.domain.model;

import com.foodstore.ecommerce_api.domain.exception.BusinessRuleException;
import com.foodstore.ecommerce_api.domain.exception.DomainException;
import com.foodstore.ecommerce_api.domain.model.interfaces.Base;

import java.time.LocalDate;

public record DetallePedido(
        Long id,
        Boolean eliminado,
        LocalDate createdAt,
        Integer cantidad,
        Double subtotal,
        Producto producto
) implements Base {
    public DetallePedido {
        validateEliminado(eliminado);
        validateCreatedAt(createdAt);
        validateCantidad(cantidad);
        validateSubtotal(subtotal);
        validateProducto(producto);
    }

    public static DetallePedido create(
            Integer cantidad,
            Producto producto
    ) {
        return new DetallePedido(null, false, LocalDate.now(), cantidad, null, producto);
    }

    public static DetallePedido rehydrate(
            Long id,
            Boolean eliminado,
            LocalDate createdAt,
            Integer cantidad,
            Producto producto
    ) {
        Double subtotal = 0.0;
        if (cantidad != null && producto != null && cantidad > 0) {
            subtotal = cantidad * producto.precio();
        }
        return new DetallePedido(id, eliminado, createdAt, cantidad, subtotal, producto);
    }

    private void validateEliminado(Boolean eliminado) throws DomainException {
        if (eliminado == null) throw new BusinessRuleException("El eliminado es obligatorio");
    }

    private void validateCreatedAt(LocalDate createdAt) throws DomainException {
        if (createdAt == null)
            throw new BusinessRuleException("La fecha de creacion es obligatoria");
        if (createdAt.isAfter(LocalDate.now()))
            throw new BusinessRuleException("La fecha de creacion no puede ser futura");
    }

    private void validateCantidad(Integer cantidad) throws DomainException {
        if (cantidad == null) throw new BusinessRuleException("La cantidad es obligatoria");
        if (cantidad < 1) throw new BusinessRuleException("La cantidad debe ser como mínimo 1. Recibido: " + cantidad);
    }

    private void validateSubtotal(Double subtotal) throws DomainException {
        if (subtotal != null && subtotal < 0.00) throw new BusinessRuleException("El subtotal no puede ser menor a 0.00. Recibido: " + subtotal);
    }

    public void validateProducto(Producto producto) {
        if (producto == null) throw new BusinessRuleException("El producto es obligatorio");
    }
}
