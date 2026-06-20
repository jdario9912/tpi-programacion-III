package com.foodstore.ecommerce_api.service;

import com.foodstore.ecommerce_api.dto.ProductoCreate;
import com.foodstore.ecommerce_api.dto.ProductoDto;
import com.foodstore.ecommerce_api.dto.ProductoEdit;
import com.foodstore.ecommerce_api.model.Categoria;
import com.foodstore.ecommerce_api.model.Producto;
import com.foodstore.ecommerce_api.repository.CategoriaRepository;
import com.foodstore.ecommerce_api.repository.ProductoRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductoService {
    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProductoDto save(ProductoCreate producto) {
        Categoria categoria = this.categoriaRepository.findByIdOrThrow(producto.idCategoria());
        Producto toSave = Producto.builder()
                .nombre(producto.nombre())
                .precio(producto.precio())
                .descripcion(producto.descripcion())
                .stock(producto.stock())
                .imagen(producto.imagen())
                .disponible(producto.disponible() != null ? producto.disponible() : true)
                .categoria(categoria)
                .build();
        return ProductoDto.from(this.productoRepository.save(toSave));
    }

    public List<ProductoDto> findAll() {
        List<Producto> productos = this.productoRepository.findAll();
        return productos.stream().map(ProductoDto::from).collect(Collectors.toList());
    }

    public ProductoDto findById(Long id) {
        return ProductoDto.from(this.productoRepository.findByIdOrThrow(id));
    }

    public List<ProductoDto> findByCategoriaId(Long id) {
        List<Producto> productos = this.productoRepository.buscarPorCategoria(id);
        return productos.stream().map(ProductoDto::from).collect(Collectors.toList());
    }

    @Transactional
    public ProductoDto update(Long id, ProductoEdit producto) {
        Producto found = this.productoRepository.findByIdOrThrow(id);
            found.setNombre(producto.nombre() != null ? producto.nombre() : found.getNombre());
            found.setPrecio(producto.precio() != null ? producto.precio() : found.getPrecio());
            found.setDescripcion(producto.descripcion() != null ? producto.descripcion() : found.getDescripcion());
            found.setStock(producto.stock() != null ? producto.stock() : found.getStock());
            found.setImagen(producto.imagen() != null ? producto.imagen() : found.getImagen());
            found.setDisponible(producto.disponible() != null ? producto.disponible() : found.getDisponible());
            found.setCategoria(producto.idCategoria() != null ? this.categoriaRepository.findByIdOrThrow(producto.idCategoria()) : found.getCategoria());
        return ProductoDto.from(this.productoRepository.save(found));
    }

    public void delete(Long id) {
        this.productoRepository.deleteById(id);
    }
}
