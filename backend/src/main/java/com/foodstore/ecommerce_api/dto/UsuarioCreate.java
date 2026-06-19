package com.foodstore.ecommerce_api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UsuarioCreate(
        @NotBlank(message = "El nombre del usuario es obligatorio")
        @Size(min = 2, max = 50, message = "El nombre del usuario debe tener entre 2 y 50 carateres")
        String nombre,

        @NotBlank(message = "El apellido del usuario es obligatorio")
        @Size(min = 2, max = 50, message = "El apellido del usuario debe tener entre 2 y 50 carateres")
        String apellido,

        @NotBlank(message = "El email del usuario es obligatorio")
        @Email(message = "El formato del email es inválido")
        String email,

        @Size(max = 20, message = "El celular del usuario debe tener como máximo 20 caracteres")
        String celular,

        @NotBlank(message = "La contraseña es obligatoria")
        @Size(min = 6, message = "La contraseña debe tener al menos 6 carateres")
        String password
) {
}
