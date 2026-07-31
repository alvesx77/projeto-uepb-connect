package com.backendProjeto.backendLab.DTOS.Vagas;

import com.backendProjeto.backendLab.Model.Vagas.ModoTrabalho;
import com.backendProjeto.backendLab.Model.Vagas.TipoEmprego;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class VagasResponseDto {

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
   private String sobreVaga;
   private String requisitos;
   private String detalhes;
}
