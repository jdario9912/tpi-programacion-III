package com.foodstore.ecommerce_api.infra.adapter.in.web;

import com.foodstore.ecommerce_api.application.dto.command.CreateCategoriaCommand;
import com.foodstore.ecommerce_api.application.dto.result.CategoriaResult;
import com.foodstore.ecommerce_api.application.use_cases.categoria.CreateCategoriaUseCase;
import com.foodstore.ecommerce_api.application.use_cases.categoria.GetAllCategoriasUseCase;
import com.foodstore.ecommerce_api.infra.adapter.in.web.dto.request.CreateCategoriaDto;
import com.foodstore.ecommerce_api.infra.adapter.in.web.dto.response.CategoriaDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {
    private final CreateCategoriaUseCase  createCategoriaUseCase;
    private final GetAllCategoriasUseCase  getAllCategoriasUseCase;

    public CategoriaController(CreateCategoriaUseCase createCategoriaUseCase, GetAllCategoriasUseCase getAllCategoriasUseCase) {
        this.createCategoriaUseCase = createCategoriaUseCase;
        this.getAllCategoriasUseCase = getAllCategoriasUseCase;
    }

    @PostMapping
    public ResponseEntity<CategoriaDto> crear(@Valid @RequestBody CreateCategoriaDto categoriaDto) {
        CategoriaResult result = this.createCategoriaUseCase.execute(new CreateCategoriaCommand(categoriaDto.nombre(), categoriaDto.descripcion()));
        return ResponseEntity.status(HttpStatus.CREATED).body(new CategoriaDto(result));
    }

    @GetMapping
    public ResponseEntity<List<CategoriaDto>> getAll() {
        List<CategoriaResult> list = this.getAllCategoriasUseCase.execute();
        return ResponseEntity.status(HttpStatus.OK).body(list.stream().map(CategoriaDto::new).toList());
    }
}
