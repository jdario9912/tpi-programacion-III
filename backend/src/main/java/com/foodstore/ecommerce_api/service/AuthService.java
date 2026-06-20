package com.foodstore.ecommerce_api.service;

import com.foodstore.ecommerce_api.dto.AuthCredencials;
import com.foodstore.ecommerce_api.dto.UsuarioDto;
import com.foodstore.ecommerce_api.exception.UnauthorizeException;
import com.foodstore.ecommerce_api.model.Usuario;
import com.foodstore.ecommerce_api.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordService passwordService;

    public UsuarioDto login(AuthCredencials authCredencials) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(authCredencials.mail());
        Boolean verified = passwordService.verificar(authCredencials.password(), usuario.get().getPassword());
        if (!usuario.isPresent() || !verified) throw new UnauthorizeException("Credenciales incorrectas");
        return UsuarioDto.from(usuario.get());
    }
}
