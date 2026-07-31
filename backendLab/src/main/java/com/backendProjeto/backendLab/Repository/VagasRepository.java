package com.backendProjeto.backendLab.Repository;

import com.backendProjeto.backendLab.Model.Vagas.Vagas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VagasRepository extends JpaRepository<Vagas,Long> {

}
