package com.backendProjeto.backendLab.Repository;

import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;


public interface UsuarioRepository extends JpaRepository<Usuarios,Long> {

    UserDetails findByEmailInstitucional(String emailInstitucional);

    @Query("""
    SELECT a.nome
    FROM Usuarios u
    JOIN u.areasAfinidade a
    WHERE u.emailInstitucional = :email
    """)
    List<String> buscarNomesAreasAfinidade(@Param("email") String email);

    @Query("""
    SELECT l.nome
    FROM Usuarios u
    JOIN u.linguagens l
    WHERE u.emailInstitucional = :email
    """)
    List<String>buscarNomesLigugens(@Param("email") String email);

    boolean existsByEmailInstitucional(String emailInstitucional);
    boolean existsByTelefone(String telefone);
    boolean existsByMatricula(String matricula);
}
