package com.foodstore.ecommerce_api.service;

import com.foodstore.ecommerce_api.dto.CategoriaCreate;
import com.foodstore.ecommerce_api.dto.CategoriaDto;
import com.foodstore.ecommerce_api.dto.CategoriaEdit;
import com.foodstore.ecommerce_api.model.Categoria;
import com.foodstore.ecommerce_api.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    public CategoriaDto save(CategoriaCreate categoriaCreate) {
        Categoria categoriaToSave = Categoria.builder().nombre(categoriaCreate.nombre()).descripcion(categoriaCreate.descripcion()).build();
        Categoria saved = this.categoriaRepository.guardar(categoriaToSave);
        return CategoriaDto.from(saved);
    }

    public List<CategoriaDto> findAll(String searchParam) {
        List<Categoria> categorias = searchParam != null ?
                this.categoriaRepository.findBySearchParam(searchParam) :
                this.categoriaRepository.listarActivos();
        return categorias.stream().map(CategoriaDto::from).collect(Collectors.toList());
    }

    public CategoriaDto findById(Long id) {
        Categoria categoria = this.categoriaRepository.findByIdOrThrow(id);
        return CategoriaDto.from(categoria);
    }

    public CategoriaDto update (Long id, CategoriaEdit categoriaEdit) {
        Categoria categoria = this.categoriaRepository.findByIdOrThrow(id);
        categoria.setNombre(categoriaEdit.nombre() != null ? categoriaEdit.nombre() : categoria.getNombre());
        categoria.setDescripcion(categoriaEdit.descripcion() != null ? categoriaEdit.descripcion() : categoria.getDescripcion());
        Categoria updated = this.categoriaRepository.guardar(categoria);
        return  CategoriaDto.from(updated);
    }

    public void delete(Long id) {
        this.categoriaRepository.deleteById(id);
    }
}
