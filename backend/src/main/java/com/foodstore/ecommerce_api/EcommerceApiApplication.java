package com.foodstore.ecommerce_api;

import com.foodstore.ecommerce_api.model.Usuario;
import com.foodstore.ecommerce_api.model.enums.Rol;
import com.foodstore.ecommerce_api.repository.ProductoRepository;
import com.foodstore.ecommerce_api.repository.UsuarioRepository;
import com.foodstore.ecommerce_api.service.PasswordService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Optional;

@Slf4j
@SpringBootApplication
public class EcommerceApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceApiApplication.class, args);
	}

	@Bean
	public CommandLineRunner init(UsuarioRepository usuarioRepository, PasswordService passwordService) {
		return args -> {
			Optional<Usuario> found = usuarioRepository.findByEmail("admin@admin.com");
			if (!found.isPresent()) {
				usuarioRepository.save(
						Usuario.builder()
								.mail("admin@admin.com")
								.password(passwordService.encriptar("123456"))
								.rol(Rol.ADMIN)
								.nombre("Admin")
								.build()
				);
				log.info("Usuario admin creado");
			}
		};
	}
}
