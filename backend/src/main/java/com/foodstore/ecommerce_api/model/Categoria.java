package com.foodstore.ecommerce_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "categorias")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@SQLRestriction("eliminado = false")
@SQLDelete(sql = "UPDATE categorias SET eliminado = true WHERE id = ?")
public class Categoria extends Base {
    private String nombre;
    private String descripcion;
}
