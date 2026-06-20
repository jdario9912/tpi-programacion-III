package com.foodstore.ecommerce_api.dto;

import com.foodstore.ecommerce_api.model.Pedido;
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
    public static PedidoDto from (Pedido pedido, Long idUsuario) {
        return new PedidoDto(
                pedido.getId(),
                pedido.getFecha(),
                pedido.getEstado(),
                pedido.getTotal(),
                pedido.getFormaPago(),
                idUsuario,
                pedido.getDetallePedidos().stream().map(detallePedido -> new DetallePedidoDto(
                        detallePedido.getId(),
                        detallePedido.getCantidad(),
                        detallePedido.getSubtotal(),
                        new ProductoDto(
                                detallePedido.getProducto().getId(),
                                detallePedido.getProducto().getNombre(),
                                detallePedido.getProducto().getPrecio(),
                                detallePedido.getProducto().getDescripcion(),
                                detallePedido.getProducto().getStock(),
                                detallePedido.getProducto().getImagen(),
                                detallePedido.getProducto().getDisponible(),
                                new CategoriaDto(
                                        detallePedido.getProducto().getCategoria().getId(),
                                        detallePedido.getProducto().getCategoria().getNombre(),
                                        detallePedido.getProducto().getCategoria().getDescripcion()
                                        )
                        )
                )).toList()
        );
    }
}
