package com.backendProjeto.backendLab.DTOS.Vagas;

import com.backendProjeto.backendLab.Model.Vagas.ModoTrabalho;
import com.backendProjeto.backendLab.Model.Vagas.TipoEmprego;
import com.backendProjeto.backendLab.Model.Vagas.Vagas;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class VagasResponseDto{

   private Long idVaga;
   private Long idEmpresa;
   private String nomeEmpresa;
   private String localEmpresa;
   private String nome;
   private String area;
   private String linguagens;
   private String frameworks;
   private TipoEmprego tipoEmprego;
   private ModoTrabalho modoTrabalho;

    private String remuneracao;
    private String cargaHoraria;
    private String duracao;
    private String beneficios;
    private String inicioPrevisto;

   private String sobreVaga;
   private String requisitos;
   private String detalhes;

    public static VagasResponseDto fromEntity(Vagas vaga) {
        return new VagasResponseDto(
                vaga.getIdVaga(),
                vaga.getEmpresa().getIdEmpresa(),
                vaga.getEmpresa().getNome(),
                vaga.getEmpresa().getLocal(),
                vaga.getNome(),
                vaga.getArea(),
                vaga.getLinguagens(),
                vaga.getFrameworks(),
                vaga.getTipoEmprego(),
                vaga.getModoTrabalho(),
                vaga.getRemuneracao(),
                vaga.getCargaHoraria(),
                vaga.getDuracao(),
                vaga.getBeneficios(),
                vaga.getInicioPrevisto(),
                vaga.getSobreVaga(),
                vaga.getRequisitos(),
                vaga.getDetalhes()
        );
    }

}
