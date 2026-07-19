package com.backendProjeto.backendLab.Repository;

import com.backendProjeto.backendLab.Model.Usuarios.AreasAfinidades;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AreasAfinidadeRepository extends JpaRepository<AreasAfinidades,Long> {
    Optional<AreasAfinidades> findByNome(String nome);
}
