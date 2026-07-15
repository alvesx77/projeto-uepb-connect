package com.backendProjeto.backendLab.Repository;

import com.backendProjeto.backendLab.Model.Usuarios.Framework;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FramewokRepository extends JpaRepository<Framework,Long> {
    Optional<Framework> findByNome(String nome);
}
