package com.backendProjeto.backendLab.Repository;

import com.backendProjeto.backendLab.Model.Vagas.SalvarVagas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VagaSalvaRepository extends JpaRepository<SalvarVagas,Long> {

    boolean existsByUsuario_IdAndVaga_IdVaga(long idUsuario, Long idVaga);

    Optional<SalvarVagas> findByUsuario_IdAndVaga_IdVaga(long idUsuario, Long idVaga);

    List<SalvarVagas> findByUsuario_Id(long idUsuario);

    long countByUsuario_Id(Long idUsuario);

}
