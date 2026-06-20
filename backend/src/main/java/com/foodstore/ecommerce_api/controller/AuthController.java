package com.foodstore.ecommerce_api.controller;

import com.foodstore.ecommerce_api.dto.AuthCredencials;
import com.foodstore.ecommerce_api.dto.UsuarioDto;
import com.foodstore.ecommerce_api.service.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Auth")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<UsuarioDto> login(@Valid @RequestBody AuthCredencials authCredencials) {
        return ResponseEntity.ok(this.authService.login(authCredencials));
    }
}
