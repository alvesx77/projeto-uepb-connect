package com.backendProjeto.backendLab.Repository;

import com.backendProjeto.backendLab.Model.Vagas.Empresas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmpresasRepository extends JpaRepository<Empresas,Long> {
    Optional<Empresas> findByNome(String nome);
}
