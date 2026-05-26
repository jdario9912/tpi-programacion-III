package com.foodstore.ecommerce_api.infra.adapter.out.persistance;

import com.foodstore.ecommerce_api.domain.model.Categoria;
import com.foodstore.ecommerce_api.domain.port.driving.CategoriaRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CategoriaJpaRepository implements CategoriaRepository {
    @Override
    public Categoria findByName(String name) throws RuntimeException {
        return null;
    }

    @Override
    public Categoria create(Categoria categoria) throws RuntimeException {
        return null;
    }

    @Override
    public ArrayList<Categoria> getAll() throws RuntimeException {
        return null;
    }

    @Override
    public Categoria findById(Long id) throws RuntimeException {
        return null;
    }

    @Override
    public Categoria update(Categoria categoria) throws RuntimeException {
        return null;
    }

    @Override
    public void delete(Long id) throws RuntimeException {

    }
}
