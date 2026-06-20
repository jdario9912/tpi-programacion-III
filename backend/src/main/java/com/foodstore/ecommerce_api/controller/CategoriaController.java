package com.foodstore.ecommerce_api.controller;

import com.foodstore.ecommerce_api.dto.CategoriaCreate;
import com.foodstore.ecommerce_api.dto.CategoriaDto;
import com.foodstore.ecommerce_api.dto.CategoriaEdit;
import com.foodstore.ecommerce_api.service.CategoriaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Categorias", description = "Gestión de categorias")
@RestController
@RequestMapping("/categorias")
@RequiredArgsConstructor
public class CategoriaController {
    private final CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<CategoriaDto> create(@RequestBody @Valid CategoriaCreate req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.categoriaService.save(req));
    }

    @GetMapping
    public ResponseEntity<List<CategoriaDto>> findAll(@RequestParam(required = false) String param) {
        return ResponseEntity.ok(this.categoriaService.findAll(param));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(this.categoriaService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaDto> update(@PathVariable Long id, @RequestBody @Valid CategoriaEdit req) {
        return ResponseEntity.ok(this.categoriaService.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.categoriaService.delete(id);
        return  ResponseEntity.noContent().build();
    }
}
