package com.backendProjeto.backendLab.DTOS.Vagas;

import com.backendProjeto.backendLab.Model.Vagas.Candidatura;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CandidaturaResponseDto {

    private Long idCandidatura;
    private Long idVaga;
    private String nomeVaga;
    private String nomeEmpresa;
    private LocalDateTime dataCandidatura;

    public static CandidaturaResponseDto fromEntity(Candidatura c) {
        return new CandidaturaResponseDto(
                c.getIdCandidatura(),
                c.getVaga().getIdVaga(),
                c.getVaga().getNome(),
                c.getVaga().getEmpresa().getNome(),
                c.getDataCandidatura()
        );
    }

}
