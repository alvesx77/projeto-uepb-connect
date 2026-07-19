package com.backendProjeto.backendLab.DTOS.InformaçõesDashbord;


import com.backendProjeto.backendLab.Model.Usuarios.AreasAfinidades;
import com.backendProjeto.backendLab.Model.Usuarios.Linguagem;
import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import lombok.*;

import java.util.List;
@NoArgsConstructor
@Setter
@Getter
public class InformaçõesDashbordDto {
    private String nomeCompleto;
    private String curso;
    private String situacaoEmpregabilidade;
    private String periodo;
    private List<String> areasAfinidades;
    private List<String> linguagens;

}
