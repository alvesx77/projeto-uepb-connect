package com.backendProjeto.backendLab.Model.Usuarios;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bancos_dados")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class BancoDeDados {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String nome;
}
