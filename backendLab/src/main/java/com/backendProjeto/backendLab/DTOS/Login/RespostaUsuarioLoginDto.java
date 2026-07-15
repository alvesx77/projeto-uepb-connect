package com.backendProjeto.backendLab.DTOS.Login;

import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class RespostaUsuarioLoginDto {

    private long id;
    private String nomeCompleto;
    private String emailInstitucional;
    private String tipoUsuario;

   public RespostaUsuarioLoginDto(Usuarios usuario){
        this.id = usuario.getId();
        this.nomeCompleto = usuario.getNomeCompleto();
        this.emailInstitucional = usuario.getEmailInstitucional();
        this.tipoUsuario = usuario.getTipoUsuario();
    }
}
