package com.foodstore.ecommerce_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;

@Entity
@Table(name = "detalles_pedidos")
@SQLDelete(sql = "UPDATE detalles_pedidos SET eliminado = true WHERE id = ?")
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class DetallePedido extends Base {
    @Getter
    private Integer cantidad;

    @Getter
    @Setter
    private Double subtotal;

    @Getter
    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    public void setCantidad(Integer cantidad) throws Exception {
        if (this.producto != null) this.validarStock(cantidad, this.producto);
    }

    public void setProducto(Producto producto) throws Exception {
        this.validarDisponibilidad(producto);
        this.producto = producto;
    }

    private void validarDisponibilidad(Producto producto) throws Exception {
        if (!producto.getDisponible()) throw new Exception("El producto no esta disponible");
    }

    private void validarStock(Integer cantidad,  Producto producto) throws Exception {
        if (cantidad > producto.getStock()) throw new Exception("Stock insuficiente");
    }
}
