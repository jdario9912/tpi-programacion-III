package com.foodstore.ecommerce_api.model;

import com.foodstore.ecommerce_api.model.enums.Estado;
import com.foodstore.ecommerce_api.model.enums.FormaPago;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "pedidos")
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class Pedido extends Base {
    @Getter
    @Setter
    private LocalDate fecha;

    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    private Estado estado;

    @Getter
    private Double total;

    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    private FormaPago formaPago;

    @Getter
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<DetallePedido> detallePedidos = new HashSet<>();

    public void addDetallePedido(DetallePedido detallePedido) throws Exception {
        this.detallePedidos.add(detallePedido);
    }

    public DetallePedido findDetallePedidoByProducto(Producto producto) {
        for (DetallePedido detallePedido : detallePedidos) {
            if (detallePedido.getProducto().equals(producto)) return detallePedido;
        }
        return null;
    }

    public void deleteDetallePedidoByProducto(Producto producto) {
        this.detallePedidos.removeIf(detallePedido -> detallePedido.getProducto().equals(producto));
    }

    public void calcularTotal() {
        detallePedidos.forEach(p -> total += p.getSubtotal());
    }
}
