package com.backendProjeto.backendLab.DTOS.InformaçõesDashbord;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class InformacoesPefilDto {
    private String nomeCompleto;
    private String curso;
    private String situacaoEmpregabilidade;
    private String periodo;
    private String emailInstitucional;
    private String telefone;
    private String matricula;
    private String curriculo;
    private String linkLinkedin;
    private String linkGithub;
    private String linkPortifolio;
    private String visibilidadePerfil;

    private List<String> areasAfinidades;
    private List<String> linguagens;
    private List<String> frameworks;
    private List<String> cloud;
    private List<String> bancoDados;

}
