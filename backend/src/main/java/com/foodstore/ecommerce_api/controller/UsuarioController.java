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
        return ResponseEntity.status(HttpStatus.CREATED).body(this.usuarioService.save(req));
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDto>> findAll() {
        return ResponseEntity.ok(this.usuarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(this.usuarioService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDto> update(@PathVariable Long id, @RequestBody @Valid UsuarioEdit req) {
        return ResponseEntity.ok(this.usuarioService.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.usuarioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
