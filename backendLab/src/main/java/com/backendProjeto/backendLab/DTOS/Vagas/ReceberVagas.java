package com.backendProjeto.backendLab.DTOS.Vagas;



import com.backendProjeto.backendLab.Model.Vagas.ModoTrabalho;
import com.backendProjeto.backendLab.Model.Vagas.TipoEmprego;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReceberVagas {

    // Empresa
    private String nome;
    private String local;

    // Vaga
    private String nomeVaga;
    private String area;

    private List<String> linguagens;
    private List<String> frameworks;

    private TipoEmprego tipoEmprego;
    private ModoTrabalho modoTrabalho;

    private String sobreVaga;
    private String requisitos;
    private String detalhes;
}