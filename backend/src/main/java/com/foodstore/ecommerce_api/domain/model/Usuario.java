package com.foodstore.ecommerce_api.domain.model;

import com.foodstore.ecommerce_api.domain.exception.BusinessRuleException;
import com.foodstore.ecommerce_api.domain.exception.DomainException;
import com.foodstore.ecommerce_api.domain.model.enums.Rol;
import com.foodstore.ecommerce_api.domain.model.interfaces.Base;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.regex.Pattern;

public record Usuario(
        Long id,
        Boolean eliminado,
        LocalDate createdAt,
        String nombre,
        String apellido,
        String mail,
        String celular,
        String password,
        Rol rol,
        ArrayList<Pedido> pedidos
) implements Base {
    public Usuario {
        if (pedidos == null) pedidos = new ArrayList<>();
        validateEliminado(eliminado);
        validateCreatedAt(createdAt);
        validateNombre(nombre);
        validateApellido(apellido);
        validateMail(mail);
        validateCelular(celular);
        validatePassword(password);
        validateRol(rol);
    }

    public static Usuario create (
            String nombre,
            String apellido,
            String mail,
            String celular,
            String password,
            ArrayList<Pedido> pedidos
    ){
        return new Usuario(null, false, LocalDate.now(), nombre, apellido, mail, celular, password, Rol.USUARIO, pedidos);
    }

    public static Usuario rehydrate(
            Long id,
            Boolean eliminado,
            LocalDate createdAt,
            String nombre,
            String apellido,
            String mail,
            String celular,
            String password,
            Rol rol,
            ArrayList<Pedido> pedidos
    ) {
        return new Usuario(id, eliminado,  createdAt, nombre, apellido, mail, celular, password, rol, pedidos);
    }

    private void validateEliminado(Boolean eliminado) throws DomainException {
        if (eliminado == null) throw new BusinessRuleException("Usuario: eliminado", "El eliminado es obligatorio");
    }

    private void validateCreatedAt(LocalDate createdAt) throws DomainException {
        if (createdAt == null)
            throw new BusinessRuleException("Usuario: fecha de creacion", "La fecha de creacion es obligatoria");
        if (createdAt.isAfter(LocalDate.now()))
            throw new BusinessRuleException("Usuario: fecha de creacion", "La fecha de creacion no puede ser futura");
    }

    private void validateNombre(String nombre) throws DomainException {
        if (nombre == null && nombre.trim().length() == 0) throw new BusinessRuleException("Usuario: nombre", "El nombre es obligatorio");
        if (nombre.length() < 2 || nombre.length() > 50) throw new BusinessRuleException("Usuario: nombre", "El nombre debe tener entre 2 e 50 caracteres");
    }

    private void validateApellido(String nombre) throws DomainException {
        if (nombre == null && nombre.trim().length() == 0) throw new BusinessRuleException("Usuario: apellido", "El apellido es obligatorio");
        if (nombre.length() < 2 || nombre.length() > 50) throw new BusinessRuleException("Usuario: apellido", "El apellido debe tener entre 2 e 50 caracteres");
    }

    private void validateMail(String mail) throws DomainException {
        if (mail == null || mail.trim().length() == 0) throw new BusinessRuleException("Usuario: email", "El mail es obligatorio");
        String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Boolean valido = Pattern.matches(EMAIL_REGEX, mail);
        if (!valido) throw new BusinessRuleException("Usuario: email", "El formato del mail es incorrecto. Recibido: " + mail);
    }

    private void validatePassword(String password) throws DomainException {
        if (password == null && password.trim().length() == 0) throw new BusinessRuleException("Usuario: contraseña", "La password es obligatorio");
        if (password.length() < 6) throw new BusinessRuleException("Usuario: contraseña", "La contraseña debe tener al menos 6 caracteres");
    }

    private void validateCelular(String celular) throws DomainException {
        if (celular != null && celular.trim().length() < 0) throw new BusinessRuleException("Usuario: celular", "El celular debe tener 20 caracteres como máximo");
    }

    private void validateRol(Rol rol) throws DomainException {
        if (rol == null) throw new BusinessRuleException("Usuario: rol", "El rol es obligatorio");
    }
}
