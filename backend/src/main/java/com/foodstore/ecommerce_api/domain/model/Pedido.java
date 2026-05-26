package com.foodstore.ecommerce_api.domain.model;

import com.foodstore.ecommerce_api.domain.exception.BusinessRuleException;
import com.foodstore.ecommerce_api.domain.exception.DomainException;
import com.foodstore.ecommerce_api.domain.model.enums.Estado;
import com.foodstore.ecommerce_api.domain.model.enums.FormaPago;
import com.foodstore.ecommerce_api.domain.model.interfaces.Base;
import com.foodstore.ecommerce_api.domain.model.interfaces.Calculable;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

public record Pedido(
        Long id,
        Boolean eliminado,
        LocalDate createdAt,
        LocalDate fecha,
        Estado estado,
        Double total,
        FormaPago formaPago,
        Set<DetallePedido> detalles
) implements Base, Calculable {
    public Pedido {
        if (detalles == null) detalles = new HashSet<>();
        validateEliminado(eliminado);
        validateCreatedAt(createdAt);
        validateFecha(fecha);
        validateEstado(estado);
        validateTotal(total);
        validateFormaPago(formaPago);
        validateDetalles(detalles);
    }

    public static Pedido create(
            LocalDate fecha,
            FormaPago formaPago,
            Set<DetallePedido> detalles
    ) {
        Double total = 0.0;
        if (detalles != null && detalles.size() > 0)
            total = detalles.stream().mapToDouble(DetallePedido::subtotal).sum();

        return new Pedido(null, false, LocalDate.now(), fecha, Estado.PENDIENTE, total, formaPago, detalles);
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

    private void validateFecha(LocalDate fecha) throws DomainException {
        if (fecha == null)  throw new BusinessRuleException("La fecha es obligatoria");
    }

    private void validateEstado(Estado estado) throws DomainException {
        if (estado == null) throw new BusinessRuleException("El estado es obligatorio");
    }

    private void validateTotal(Double total) throws DomainException {
        if (total == null && total < 0.0) throw new BusinessRuleException("El total es obligatorio y no puede ser menor a 0.0. Recibido: " + total);
    }

    private void validateFormaPago(FormaPago formaPago) throws DomainException {
        if (formaPago == null) throw new BusinessRuleException("La forma pago es obligatoria");
    }

    private void validateDetalles(Set<DetallePedido> detalles) throws DomainException {
        if (detalles == null && detalles.size() == 0) throw new BusinessRuleException("El detalle de compra es obligatorio y debe contener al menos uno");
    }

    public void addDetallePedido(Integer cantidad, Producto producto) {
        this.detalles.add(DetallePedido.create(cantidad, producto));
    }

    public Optional<DetallePedido> findDetallePedidoByProducto(Producto producto) {
        return this.detalles.stream().filter(detalle -> detalle.producto().id().equals(producto.id())).findFirst();
    }

    public void deleteDetallePedidoByProducto(Producto producto) {
        this.detalles.removeIf(detalle -> detalle.producto().id().equals(producto.id()));
    }

    @Override
    public Double calcularTotal() {
        return this.detalles.stream().mapToDouble(DetallePedido::subtotal).sum();
    }
}
