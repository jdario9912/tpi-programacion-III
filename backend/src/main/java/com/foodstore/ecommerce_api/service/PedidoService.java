package com.foodstore.ecommerce_api.service;

import com.foodstore.ecommerce_api.dto.PedidoCreate;
import com.foodstore.ecommerce_api.dto.PedidoDto;
import com.foodstore.ecommerce_api.model.Producto;
import com.foodstore.ecommerce_api.model.Usuario;
import com.foodstore.ecommerce_api.repository.PedidoRepository;
import com.foodstore.ecommerce_api.repository.ProductoRepository;
import com.foodstore.ecommerce_api.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;

    // Seguir con esta logica
    public void save (PedidoCreate pedidoCreate) {
        Usuario usuario = this.usuarioRepository.findByIdOrThrow(pedidoCreate.idUsuario());
//        Producto producto = this.productoRepository.findByIdOrThrow(pedidoCreate.detallePedidos().stream)
//        return PedidoDto()
    }
}
