package com.foodstore.ecommerce_api.dto;

import com.foodstore.ecommerce_api.model.Usuario;
import com.foodstore.ecommerce_api.model.enums.Rol;

public record UsuarioDto(
    Long id,
    String nombre,
    String apellido,
    String email,
    String celular,
    Rol rol
) {
    public static UsuarioDto from(Usuario usuario) {
        return new UsuarioDto(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getMail(),
                usuario.getCelular(),
                usuario.getRol()
        );
    }
}
