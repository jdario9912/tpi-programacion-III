package com.foodstore.ecommerce_api.domain.port.driving;

import com.foodstore.ecommerce_api.domain.model.Usuario;

public interface UsuarioRepository extends Base<Usuario> {
    Usuario findByEmail(String email) throws RuntimeException;
}
