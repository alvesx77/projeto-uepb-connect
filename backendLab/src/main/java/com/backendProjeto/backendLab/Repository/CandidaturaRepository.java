package com.backendProjeto.backendLab.Repository;

import com.backendProjeto.backendLab.Model.Vagas.Candidatura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidaturaRepository extends JpaRepository<Candidatura,Long> {
    boolean existsByUsuario_IdAndVaga_IdVaga(long idUsuario, Long idVaga);
    long countByUsuario_Id(Long idUsuario);
}
