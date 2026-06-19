package com.foodstore.ecommerce_api.controller;

import com.foodstore.ecommerce_api.dto.UsuarioCreate;
import com.foodstore.ecommerce_api.dto.UsuarioDto;
import com.foodstore.ecommerce_api.dto.UsuarioEdit;
import com.foodstore.ecommerce_api.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioDto> save(@RequestBody @Valid UsuarioCreate req) {
        UsuarioDto saved = this.usuarioService.save(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDto>> findAll() {
        List<UsuarioDto> usuarios = this.usuarioService.findAll();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDto> findById(@PathVariable Long id) {
        UsuarioDto found = this.usuarioService.findById(id);
        return ResponseEntity.ok(found);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDto> update(@PathVariable Long id, @RequestBody @Valid UsuarioEdit req) {
        UsuarioDto updated = this.usuarioService.update(id, req);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.usuarioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
