package com.backendProjeto.backendLab.DTOS.InformaçõesDashbord;


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

}
