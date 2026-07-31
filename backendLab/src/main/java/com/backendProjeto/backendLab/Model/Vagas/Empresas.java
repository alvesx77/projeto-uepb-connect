package com.backendProjeto.backendLab.Model.Vagas;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "empresas")
public class Empresas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_empresa")
    private Long idEmpresa;

    @Column(nullable = false)
    private String nome;

    @Column(name = "local", nullable = false)
    private String local;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "empresa")
    private List<Vagas> vagas = new ArrayList<>();
}