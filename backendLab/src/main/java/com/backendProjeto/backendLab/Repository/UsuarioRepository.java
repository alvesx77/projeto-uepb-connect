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

    @Query("""
    SELECT l.nome
    FROM Usuarios u
    JOIN u.frameworks l
    WHERE u.emailInstitucional = :email
    """)
    List<String>buscarNomesFrameworks(@Param("email")String email);

    @Query("""
    SELECT l.nome
    FROM Usuarios u
    JOIN u.cloud l
    WHERE u.emailInstitucional = :email
    """)
    List<String>buscarNomesClouds(@Param("email") String email);

    @Query("""
    SELECT l.nome
    FROM Usuarios u
    JOIN u.bancoDados l
    WHERE u.emailInstitucional = :email
    """)
    List<String>buscarNomesBancosDados(@Param("email")String email);

    Usuarios findByEmailInstitucional(String emailInstitucional);
    boolean existsByEmailInstitucional(String emailInstitucional);
    boolean existsByTelefone(String telefone);
    boolean existsByMatricula(String matricula);
}
