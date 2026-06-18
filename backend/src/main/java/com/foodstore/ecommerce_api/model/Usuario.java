package com.foodstore.ecommerce_api.model;

import com.foodstore.ecommerce_api.model.enums.Rol;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Entity
@NamedQuery(
        name = "Usuario.buscarPorEmail",
        query = "SELECT p FROM Usuario p WHERE p.mail = :email"
)
@Table(name = "usuarios")
@ToString(callSuper = true, exclude = "password")
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class Usuario extends Base {
    @Getter
    @Setter
    private String nombre;

    @Getter
    @Setter
    private String apellido;

    @Getter
    @Setter
    private String mail;

    @Getter
    @Setter
    private String celular;

    @Getter
    @Setter
    private String password;

    @Getter
    @Setter
    private Rol rol;

    @Getter
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private Set<Pedido> pedidos = new HashSet<>();

    public void addPedido (Pedido pedido) {
        this.pedidos.add(pedido);
    }
}
