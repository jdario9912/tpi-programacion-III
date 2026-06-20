package com.foodstore.ecommerce_api.service;

import com.foodstore.ecommerce_api.dto.UsuarioCreate;
import com.foodstore.ecommerce_api.dto.UsuarioDto;
import com.foodstore.ecommerce_api.dto.UsuarioEdit;
import com.foodstore.ecommerce_api.exception.DuplicateResourceException;
import com.foodstore.ecommerce_api.model.Usuario;
import com.foodstore.ecommerce_api.model.enums.Rol;
import com.foodstore.ecommerce_api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioDto save(UsuarioCreate usuario) {
        Optional<Usuario> usuarioFound = this.usuarioRepository.findByEmail(usuario.email());
        if (usuarioFound.isPresent()) throw new DuplicateResourceException("El email " + usuario.email() + " ya existe");
        Usuario usuarioToSave = Usuario.builder()
                .nombre(usuario.nombre())
                .apellido(usuario.apellido())
                .mail(usuario.email())
                .celular(usuario.celular())
                .rol(Rol.USUARIO)
                .password(this.passwordEncoder.encode(usuario.password()))
                .build();
        Usuario saved = this.usuarioRepository.save(usuarioToSave);
        return UsuarioDto.from(saved);
    }

    public List<UsuarioDto> findAll() {
        List<Usuario> usuarios = this.usuarioRepository.findAll();
        return usuarios.stream().map(UsuarioDto::from).collect(Collectors.toList());
    }

    public UsuarioDto findById(Long id) {
        Usuario found = this.usuarioRepository.findByIdOrThrow(id);
        return UsuarioDto.from(found);
    }

    public UsuarioDto update (Long id, UsuarioEdit usuarioEdit) {
        Usuario usuario = this.usuarioRepository.findByIdOrThrow(id);
        if (usuarioEdit.email() != null && usuarioEdit.email().equals(usuario.getMail()))
            throw new DuplicateResourceException("El email " + usuarioEdit.email() + " ya existe");

        usuario.setNombre(usuarioEdit.nombre() != null ? usuarioEdit.nombre() : usuario.getNombre());
        usuario.setApellido(usuarioEdit.apellido() != null ? usuarioEdit.apellido() : usuario.getApellido());
        usuario.setMail(usuarioEdit.email() != null ? usuarioEdit.email() : usuario.getMail());
        usuario.setCelular(usuarioEdit.celular() != null ? usuarioEdit.celular() : usuario.getCelular());
        usuario.setPassword(usuarioEdit.password() != null ? this.passwordEncoder.encode(usuarioEdit.password()) : usuario.getPassword());
        Usuario updated = this.usuarioRepository.save(usuario);
        return UsuarioDto.from(updated);
    }

    public void deleteById(Long id) {
        this.usuarioRepository.deleteById(id);
    }
}
