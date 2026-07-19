package com.backendProjeto.backendLab.Model.Usuarios;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "linguagens")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Linguagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String nome;

}
