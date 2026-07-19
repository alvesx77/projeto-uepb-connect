package com.backendProjeto.backendLab.Model.Usuarios;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Data
@Entity
@Table(name = "refresh_tokens")
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false,unique = true)
    private String tokenHash;

    @ManyToOne
    @JoinColumn(name = "usuario_id",nullable = false)
    private Usuarios usuarios;

    @Column(nullable = false)
    private Instant expiraEm;

    @Column(nullable = false)
    private Instant criadoEm;

    private Instant revogadoEm;
}
