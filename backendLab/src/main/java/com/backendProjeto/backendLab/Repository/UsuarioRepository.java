package com.backendProjeto.backendLab.Repository;

import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UsuarioRepository extends JpaRepository<Usuarios,Long> {

    Optional<Usuarios> findByNomeCompleto(String nomeCompleto);
    Optional<Usuarios> findByEmailInstitucional(String emalInstitucional);

    boolean existsByEmailInstitucional(String emailInstitucional);
    boolean existsByTelefone(String telefone);
    boolean existsByMatricula(String matricula);
}
