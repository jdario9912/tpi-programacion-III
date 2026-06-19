package com.foodstore.ecommerce_api.dto;

import com.foodstore.ecommerce_api.model.enums.Estado;
import com.foodstore.ecommerce_api.model.enums.FormaPago;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record PedidoDto(
        Long id,
        LocalDate fecha,
        Estado estado,
        BigDecimal total,
        FormaPago formaPago,
        Long idUsuario,
        List<DetallePedidoDto> detalles
) {
}
