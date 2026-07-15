package com.backendProjeto.backendLab.Repository;

import com.backendProjeto.backendLab.Model.Usuarios.Linguagem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LinguagemRepository extends JpaRepository<Linguagem,Long> {
    Optional<Linguagem> findByNome(String nome);
}
