package com.foodstore.ecommerce_api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "categorias")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class Categoria extends Base {
    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 500)
    private String descripcion;
}
