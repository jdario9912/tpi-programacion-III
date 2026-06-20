package com.foodstore.ecommerce_api.repository;

import com.foodstore.ecommerce_api.model.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends BaseRepository<Usuario, Long> {
    @Query("SELECT u FROM Usuario u WHERE u.mail = :email AND u.eliminado = false")
    Optional<Usuario> findByEmail(@Param("email") String email);
}
