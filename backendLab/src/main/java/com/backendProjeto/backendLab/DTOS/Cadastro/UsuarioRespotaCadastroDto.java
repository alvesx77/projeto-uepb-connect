package com.backendProjeto.backendLab.DTOS.Cadastro;

import com.backendProjeto.backendLab.Model.Usuarios.TipoUsuario;
import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UsuarioRespotaCadastroDto {
    private long id;
    private String nomeCompelto;
    private String emailInstitucional;
    private String telefone;
    private String curso;
    private String periodo;
    private String matricula;
    private TipoUsuario tipoUsuario;

    public UsuarioRespotaCadastroDto(Usuarios usuarios) {
        this.curso = usuarios.getCurso();
        this.emailInstitucional = usuarios.getEmailInstitucional();
        this.id = usuarios.getId();
        this.matricula = usuarios.getMatricula();
        this.nomeCompelto = usuarios.getNomeCompleto();
        this.periodo = usuarios.getPeriodo();
        this.telefone = usuarios.getTelefone();
        this.tipoUsuario = usuarios.getTipoUsuario();
    }
}
