package com.foodstore.ecommerce_api.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import java.math.BigDecimal;

@Entity
@Table(name = "productos")
@Getter
@Setter
@EqualsAndHashCode(callSuper = true, exclude = "categoria")
@ToString(callSuper = true, exclude = "categoria")
@NoArgsConstructor
@SuperBuilder
public class Producto extends Base {
    @Column(length = 100, nullable = false)
    private String nombre;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @Column(length = 500)
    private String descripcion;

    @Column(nullable = false)
    private Integer stock;

    @Column(length = 500)
    private String imagen;

    @Column(nullable = false)
    private Boolean disponible = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    public Boolean tieneStockSuficiente(Integer cantidadSolicitada) {
        return this.stock >= cantidadSolicitada;
    }

    public void reducirStock(Integer cantidad) {
        this.stock -= cantidad;
    }
}
