package com.foodstore.ecommerce_api.controller;

import com.foodstore.ecommerce_api.dto.PedidoCreate;
import com.foodstore.ecommerce_api.dto.PedidoDto;
import com.foodstore.ecommerce_api.dto.PedidoEdit;
import com.foodstore.ecommerce_api.service.PedidoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
@AllArgsConstructor
public class PedidoController {
    private final PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<PedidoDto> save(@RequestBody @Valid PedidoCreate req) {
        return ResponseEntity.ok(pedidoService.save(req));
    }

    @GetMapping
    public ResponseEntity<List<PedidoDto>> findAll() {
        return ResponseEntity.ok(pedidoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.findById(id));
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<PedidoDto>> findByUsuarioId(@PathVariable Long id){
        return ResponseEntity.ok(pedidoService.findByUserId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedidoDto> update(@PathVariable Long id, @RequestBody @Valid PedidoEdit req) {
        return ResponseEntity.ok(pedidoService.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.pedidoService.delete(id);
        return  ResponseEntity.noContent().build();
    }
}
