package com.backendProjeto.backendLab.Model.Usuarios;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clouds")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Clouds {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String nome;
}
