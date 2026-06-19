package com.foodstore.ecommerce_api.model;

import com.foodstore.ecommerce_api.model.enums.Rol;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.HashSet;
import java.util.Set;

@Entity
@NamedQuery(
        name = "Usuario.buscarPorEmail",
        query = "SELECT u FROM Usuario u WHERE u.mail = :email AND u.eliminado = false"
)
@Table(name = "usuarios")
@SQLRestriction("eliminado = false")
@SQLDelete(sql = "UPDATE usuarios SET eliminado = true WHERE id = ?")
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
    @Column(unique = true, nullable = false)
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
    @JoinColumn(name = "usuario_id")
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Pedido> pedidos = new HashSet<>();

    public void addPedido (Pedido pedido) {
        this.pedidos.add(pedido);
    }
}
