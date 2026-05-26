package com.foodstore.ecommerce_api.infra.adapter.out.persistance.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
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
