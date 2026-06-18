package com.foodstore.ecommerce_api.controller;

import com.foodstore.ecommerce_api.dto.CategoriaCreate;
import com.foodstore.ecommerce_api.dto.CategoriaDto;
import com.foodstore.ecommerce_api.dto.CategoriaEdit;
import com.foodstore.ecommerce_api.service.CategoriaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@RequiredArgsConstructor
public class CategoriaController {
    private final CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<CategoriaDto> create(@RequestBody @Valid CategoriaCreate req) {
        CategoriaDto saved = this.categoriaService.save(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<CategoriaDto>> findAll(@RequestParam(required = false) String param) {
        List<CategoriaDto> categorias = this.categoriaService.findAll(param);
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaDto> findById(@PathVariable Long id) {
        CategoriaDto categoria = this.categoriaService.findById(id);
        return ResponseEntity.ok(categoria);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaDto> update(@PathVariable Long id, @RequestBody @Valid CategoriaEdit req) {
        CategoriaDto saved = this.categoriaService.update(id, req);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.categoriaService.delete(id);
        return  ResponseEntity.noContent().build();
    }
}
