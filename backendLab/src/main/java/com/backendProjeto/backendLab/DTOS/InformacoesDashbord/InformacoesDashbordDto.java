package com.backendProjeto.backendLab.DTOS.InformacoesDashbord;


import lombok.*;

import java.util.List;
@NoArgsConstructor
@Setter
@Getter
public class InformacoesDashbordDto {
    private String nomeCompleto;
    private String curso;
    private String situacaoEmpregabilidade;
    private String periodo;
    private List<String> areasAfinidades;
    private List<String> linguagens;
    private List<String> frameworks;
    private List<String> clouds;
    private List<String> bancoDados;

    private long quantidadeVagas;

    private long quantidadeCandidaturas;

    private long quantidadeVagasSalvas;
}
