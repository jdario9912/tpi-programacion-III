package com.foodstore.ecommerce_api.infra.adapter.out.persistance.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "categorias")
@SQLRestriction("eliminado = false")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoriaJpaEntity extends Base {
    @Column(length = 100, nullable = false)
    String nombre;

    @Column(length = 500, nullable = false)
    String descripcion;
}
