package com.foodstore.ecommerce_api.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import java.math.BigDecimal;

@Entity
@Table(name = "detalles_pedidos")
@EqualsAndHashCode(callSuper = true, exclude = {"pedido", "producto"})
@ToString(callSuper = true, exclude = {"pedido", "producto"})
@SuperBuilder
@NoArgsConstructor
public class DetallePedido extends Base {
    @Setter
    @Getter
    private Integer cantidad;

    @Getter
    @Setter
    private BigDecimal subtotal;

    @Setter
    @Getter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;
}
