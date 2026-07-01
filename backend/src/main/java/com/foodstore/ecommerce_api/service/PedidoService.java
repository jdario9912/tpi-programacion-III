package com.foodstore.ecommerce_api.service;

import com.foodstore.ecommerce_api.dto.DetallePedidoCreate;
import com.foodstore.ecommerce_api.dto.PedidoCreate;
import com.foodstore.ecommerce_api.dto.PedidoDto;
import com.foodstore.ecommerce_api.dto.PedidoEdit;
import com.foodstore.ecommerce_api.exception.BusinessException;
import com.foodstore.ecommerce_api.model.DetallePedido;
import com.foodstore.ecommerce_api.model.Pedido;
import com.foodstore.ecommerce_api.model.Producto;
import com.foodstore.ecommerce_api.model.Usuario;
import com.foodstore.ecommerce_api.repository.PedidoRepository;
import com.foodstore.ecommerce_api.repository.ProductoRepository;
import com.foodstore.ecommerce_api.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;

    @Transactional
    public PedidoDto save (PedidoCreate pedidoCreate) {
        Usuario usuario = this.usuarioRepository.findByIdOrThrow(pedidoCreate.idUsuario());
        if (pedidoCreate.detallePedidos().isEmpty()) throw new BusinessException("El detalle debe debe tener al menos un pedido");
        List<Producto> productos = this.obtenerProductosDesdeDetallePedido(pedidoCreate.detallePedidos());
        this.checkDisponibilidadProductos(productos);
        Map<Long, Integer> cantidadesPorId = this.cantidadesPorId(pedidoCreate.detallePedidos());
        this.checkStockProductos(productos, cantidadesPorId);
        this.checkCantidades(pedidoCreate.detallePedidos());

        List<DetallePedido> detalles = this.crearDetalles(productos, cantidadesPorId);
        Pedido pedido = new Pedido();
        detalles.forEach(pedido::addDetallePedido);
        pedido.setFecha(LocalDate.now());
        pedido.setEstado(pedidoCreate.estado());
        pedido.setFormaPago(pedidoCreate.formaPago());
        pedido.calcularTotal();
        usuario.addPedido(pedido);
        Pedido pedidoSaved = this.pedidoRepository.save(pedido);
        this.descontarStock(productos, cantidadesPorId);
        return PedidoDto.fromWhitUsuarioId(pedidoSaved, pedidoCreate.idUsuario());
    }

    private List<Producto> obtenerProductosDesdeDetallePedido(List<DetallePedidoCreate> detallePedidoCreate) {
        List<Long> ids = detallePedidoCreate.stream()
                .map(DetallePedidoCreate::idProducto)
                .toList();
        return productoRepository.findAllById(ids);
    }

    private void checkDisponibilidadProductos(List<Producto> productos) {
        List<String> noDisponibles = productos.stream()
                .filter(p -> !p.getDisponible())
                .map(Producto::getNombre)
                .toList();
        if (!noDisponibles.isEmpty()) throw new BusinessException("Los siguientes productos no están disponibles: " + noDisponibles);
    }

    private Map<Long, Integer> cantidadesPorId(List<DetallePedidoCreate> detallePedidoCreate) {
        return detallePedidoCreate.stream()
                .collect(Collectors.toMap(
                        DetallePedidoCreate::idProducto,
                        DetallePedidoCreate::cantidad
                ));
    }

    private void checkStockProductos(List<Producto> productos, Map<Long, Integer> cantidadesPorId) {
        List<String> sinStock = productos.stream()
                .filter(p -> !p.tieneStockSuficiente(cantidadesPorId.get(p.getId())))
                .map(Producto::getNombre)
                .toList();
        if (!sinStock.isEmpty()) throw new BusinessException("Los siguientes productos no tienen stock suficiente: " + sinStock);
    }

    private void checkCantidades(List<DetallePedidoCreate> detallePedidoCreate) {
        List<Integer> cantidades = detallePedidoCreate
                .stream().filter(d -> d.cantidad() < 0)
                .map(DetallePedidoCreate::cantidad)
                .toList();
        if (!cantidades.isEmpty()) throw  new BusinessException("El cantidad debe ser mayor a 0");
    }

    private List<DetallePedido> crearDetalles(List<Producto> productos, Map<Long, Integer> cantidadesPorId) {
        return productos.stream()
                .map(p -> {
                    Integer cantidad = cantidadesPorId.get(p.getId());
                    BigDecimal subtotal = p.getPrecio().multiply(BigDecimal.valueOf(cantidad));
                    DetallePedido detalle = DetallePedido.builder()
                            .producto(p)
                            .cantidad(cantidad)
                            .subtotal(subtotal)
                            .build();
                    return detalle;
                })
                .toList();
    }

    private void descontarStock(List<Producto> productos, Map<Long, Integer> cantidadesPorId) {
        productos.forEach(p -> {
            p.setStock(p.getStock() - cantidadesPorId.get(p.getId()));
        });
        productoRepository.saveAll(productos);
    }

    public List<PedidoDto> findAll() {
        List<Pedido> pedidos = this.pedidoRepository.findAll();
        return pedidos.stream().map(PedidoDto::from).collect(Collectors.toList());
    }

    public PedidoDto findById(Long id) {
        return PedidoDto.from(this.pedidoRepository.findByIdOrThrow(id));
    }

    public List<PedidoDto> findByUserId(Long userId) {
        Usuario usuario = this.usuarioRepository.findByIdOrThrow(userId);
        return usuario.getPedidos().stream().map(PedidoDto::from).collect(Collectors.toList());
    }

    public PedidoDto update(Long id, PedidoEdit pedido) {
        Pedido found = this.pedidoRepository.findByIdOrThrow(id);
        found.setFormaPago(pedido.formaPago() != null ? pedido.formaPago() : found.getFormaPago());
        found.setEstado(pedido.estado() != null ? pedido.estado() : found.getEstado());
        Pedido updated = this.pedidoRepository.save(found);
        return PedidoDto.from(updated);
    }

    public void delete(Long id) {
        this.pedidoRepository.findByIdOrThrow(id);
        this.pedidoRepository.deleteById(id);
    }
}
