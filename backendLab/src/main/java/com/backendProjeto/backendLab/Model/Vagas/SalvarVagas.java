package com.backendProjeto.backendLab.Model.Vagas;

import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(
        name = "vagas_salvas",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_usuario_vaga_salva",
                        columnNames = {"id_usuario", "id_vaga"}
                )
        }
)

public class SalvarVagas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_vaga_salva")
    private Long idVagaSalva;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuarios usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_vaga", nullable = false)
    private Vagas vaga;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

}
