package com.backendProjeto.backendLab.Model.Usuarios;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "areas_afinidades")
@Data
public class AreasAfinidades {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String nome;
}
