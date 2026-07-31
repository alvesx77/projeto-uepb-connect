package com.backendProjeto.backendLab.Model.Vagas;

import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "candidaturas",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_usuario_vaga",
                        columnNames = {"id_usuario", "id_vaga"}
                )
        }
)
public class Candidatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_candidatura")
    private Long idCandidatura;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuarios usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_vaga", nullable = false)
    private Vagas vaga;

    @Column(name = "data_candidatura", insertable = false, updatable = false)
    private LocalDateTime dataCandidatura;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;
}