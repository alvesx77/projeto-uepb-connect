package com.backendProjeto.backendLab.Repository;

import com.backendProjeto.backendLab.Model.Vagas.Vagas;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VagasRepository extends JpaRepository<Vagas,Long> {
    @Override
    @EntityGraph(attributePaths = "empresa")
    Page<Vagas> findAll(Pageable pageable);

    Page<Vagas> findByArea(String area,Pageable pageable);
}
