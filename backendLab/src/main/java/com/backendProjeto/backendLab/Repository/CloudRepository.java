package com.backendProjeto.backendLab.Repository;

import com.backendProjeto.backendLab.Model.Usuarios.Clouds;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CloudRepository extends JpaRepository<Clouds,Long> {
    Optional<Clouds> findByNome(String nome);
}
