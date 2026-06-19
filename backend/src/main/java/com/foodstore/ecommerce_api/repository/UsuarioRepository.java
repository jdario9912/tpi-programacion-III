package com.foodstore.ecommerce_api.repository;

import com.foodstore.ecommerce_api.model.Usuario;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UsuarioRepository extends BaseRepository<Usuario> {
    public UsuarioRepository() {
        super(Usuario.class);
    }

    public Optional<Usuario> findByEmail(String email) {
        List<Usuario> result = em.createNamedQuery("Usuario.buscarPorEmail", Usuario.class).setParameter("email", email).getResultList();
        return result.isEmpty() ? Optional.empty() : Optional.of(result.get(0));
    }
}
