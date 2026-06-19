package com.foodstore.ecommerce_api.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.math.BigDecimal;

@Entity
@Table(name = "productos")
@SQLRestriction("eliminado = false")
@SQLDelete(sql = "UPDATE productos SET eliminado = true WHERE id = ?")
@NamedQuery(
        name = "Producto.buscarPorCategoria",
        query = "SELECT p FROM Producto p WHERE p.categoria.id = :idCategoria AND p.eliminado = false"
)
@Getter
@Setter
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
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
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    public Boolean tieneStockSuficiente(Integer cantidadSolicitada) {
        return this.stock >= cantidadSolicitada;
    }

    public void reducirStock(Integer cantidad) {
        this.stock -= cantidad;
    }
}
