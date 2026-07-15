package com.backendProjeto.backendLab.Repository;

import com.backendProjeto.backendLab.Model.Usuarios.BancoDeDados;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BancoDeDadosRepository extends JpaRepository<BancoDeDados,Long> {
    Optional<BancoDeDados> findByNome(String nome);
}
