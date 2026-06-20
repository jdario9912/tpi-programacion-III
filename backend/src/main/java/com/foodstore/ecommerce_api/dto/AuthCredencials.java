package com.foodstore.ecommerce_api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AuthCredencials(
        @NotBlank(message = "El correo es obligatorio")
        @Email(message = "El correo debe tener un formato correcto")
        String mail,

        @NotBlank(message = "La contraseña es obligatoria")
        String password
) {
}
