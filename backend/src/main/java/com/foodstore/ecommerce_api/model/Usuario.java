package com.foodstore.ecommerce_api.model;

import com.foodstore.ecommerce_api.model.enums.Rol;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "usuarios")
@ToString(callSuper = true, exclude = "password")
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class Usuario extends Base {
    @Getter
    @Setter
    @Column(length = 50, nullable = false)
    private String nombre;

    @Getter
    @Setter
    @Column(length = 50)
    private String apellido;

    @Getter
    @Setter
    @Column(unique = true, nullable = false, length = 50)
    private String mail;

    @Getter
    @Setter
    @Column(length = 20)
    private String celular;

    @Getter
    @Setter
    private String password;

    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    private Rol rol;

    @Getter
    @JoinColumn(name = "usuario_id")
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default
    private Set<Pedido> pedidos = new HashSet<>();

    public void addPedido (Pedido pedido) {
        this.pedidos.add(pedido);
    }
}
