package com.foodstore.ecommerce_api.controller;

import com.foodstore.ecommerce_api.dto.ProductoCreate;
import com.foodstore.ecommerce_api.dto.ProductoDto;
import com.foodstore.ecommerce_api.dto.ProductoEdit;
import com.foodstore.ecommerce_api.service.ProductoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
@AllArgsConstructor
public class ProductoController {
    private final ProductoService productoService;

    @PostMapping
    public ResponseEntity<ProductoDto> save(@Valid @RequestBody ProductoCreate req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productoService.save(req));
    }

    @GetMapping
    public ResponseEntity<List<ProductoDto>> findAll() {
        return ResponseEntity.ok(productoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.findById(id));
    }

    @GetMapping("/categoria/{idCategoria}")
    public ResponseEntity<List<ProductoDto>> findByCategoriaId(@PathVariable Long idCategoria) {
        return ResponseEntity.ok(productoService.findByCategoriaId(idCategoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoDto> update(@PathVariable Long id, @RequestBody @Valid ProductoEdit req) {
        return ResponseEntity.ok(productoService.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productoService.delete(id);
        return  ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
