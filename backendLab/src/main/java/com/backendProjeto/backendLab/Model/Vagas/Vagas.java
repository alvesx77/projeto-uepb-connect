package com.backendProjeto.backendLab.Model.Vagas;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "vagas")
public class Vagas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_vaga")
    private Long idVaga;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_empresa", nullable = false)
    private Empresas empresa;

    private String nome;

    private String area;

    @Column(columnDefinition = "TEXT")
    private String linguagens;

    @Column(columnDefinition = "TEXT")
    private String frameworks;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_emprego")
    private TipoEmprego tipoEmprego;

    @Enumerated(EnumType.STRING)
    @Column(name = "modo_trabalho")
    private ModoTrabalho modoTrabalho;

    @Column(columnDefinition = "TEXT")
    private String Remuneracao;
    @Column(columnDefinition = "TEXT")
    private String cargaHoraria;
    @Column(columnDefinition = "TEXT")
    private String duracao;
    @Column(columnDefinition = "TEXT")
    private String Beneficios;
    @Column(columnDefinition = "TEXT")
    private String inicioPrevisto;

    @Column(columnDefinition = "TEXT")
    private String sobreVaga;

    @Column(columnDefinition = "TEXT")
    private String requisitos;

    @Column(columnDefinition = "TEXT")
    private String detalhes;
}