package com.foodstore.ecommerce_api.infra.adapter.in.web;

import com.foodstore.ecommerce_api.application.dto.command.CreateCategoriaCommand;
import com.foodstore.ecommerce_api.application.dto.command.UpdateCategoriaCommand;
import com.foodstore.ecommerce_api.application.dto.result.CategoriaResult;
import com.foodstore.ecommerce_api.application.use_cases.categoria.*;
import com.foodstore.ecommerce_api.infra.adapter.in.web.dto.request.CreateCategoriaDto;
import com.foodstore.ecommerce_api.infra.adapter.in.web.dto.request.UpdateCategoriaDto;
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
    private final UpdateCategoriaUseCase updateCategoriaUseCase;
    private final GetCategoriaByIdUseCase getCategoriaByIdUseCase;
    private final DeleteCategoriaUseCase deleteCategoriaUseCase;
    private final GetCategoriaByNameUseCase getCategoriaByNameUseCase;

    public CategoriaController(CreateCategoriaUseCase createCategoriaUseCase, GetAllCategoriasUseCase getAllCategoriasUseCase, UpdateCategoriaUseCase updateCategoriaUseCase, GetCategoriaByIdUseCase getCategoriaByIdUseCase, DeleteCategoriaUseCase deleteCategoriaUseCase, GetCategoriaByNameUseCase getCategoriaByNameUseCase) {
        this.createCategoriaUseCase = createCategoriaUseCase;
        this.getAllCategoriasUseCase = getAllCategoriasUseCase;
        this.updateCategoriaUseCase = updateCategoriaUseCase;
        this.getCategoriaByIdUseCase = getCategoriaByIdUseCase;
        this.deleteCategoriaUseCase = deleteCategoriaUseCase;
        this.getCategoriaByNameUseCase = getCategoriaByNameUseCase;
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

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaDto> getById(@PathVariable Long id) {
        System.out.println(id);
        CategoriaResult result = this.getCategoriaByIdUseCase.execute(id);
        return ResponseEntity.status(HttpStatus.OK).body(new CategoriaDto(result));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaDto> update(@Valid @RequestBody UpdateCategoriaDto categoriaDto, @PathVariable Long id) {
        CategoriaResult result = this.updateCategoriaUseCase.execute(new UpdateCategoriaCommand(id, categoriaDto.eliminado(), categoriaDto.nombre(), categoriaDto.descripcion()));
        return ResponseEntity.status(HttpStatus.OK).body(new CategoriaDto(result));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.deleteCategoriaUseCase.execute(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/nombre")
    public ResponseEntity<List<CategoriaDto>> findByNombre(@RequestParam String nombre) {
        List<CategoriaResult> result = this.getCategoriaByNameUseCase.execute(nombre);
        return ResponseEntity.status(HttpStatus.OK).body(result.stream().map(CategoriaDto::new).toList());
    }
}
