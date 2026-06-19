package com.foodstore.ecommerce_api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UsuarioEdit(
        @Size(min = 2, max = 50, message = "El nombre del usuario debe tener entre 2 y 50 carateres")
        String nombre,

        @Size(min = 2, max = 50, message = "El apellido del usuario debe tener entre 2 y 50 carateres")
        String apellido,

        @Email(message = "El formato del email es inválido")
        String email,

        @Size(max = 20, message = "El celular del usuario debe tener como máximo 20 caracteres")
        String celular,

        @Size(min = 6, message = "La contraseña debe tener al menos 6 carateres")
        String password
) {
}
