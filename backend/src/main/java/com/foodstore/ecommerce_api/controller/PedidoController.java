package com.foodstore.ecommerce_api.controller;

import com.foodstore.ecommerce_api.dto.PedidoCreate;
import com.foodstore.ecommerce_api.dto.PedidoDto;
import com.foodstore.ecommerce_api.service.PedidoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pedidos")
@AllArgsConstructor
public class PedidoController {
    private final PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<PedidoDto> save(@RequestBody @Valid PedidoCreate req) {
        return ResponseEntity.ok(pedidoService.save(req));
    }
}
