package com.backendProjeto.backendLab.DTOS.Login;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class TokenDto {
    private String nomeCompleto;
    private String token;
    private String tipoUsuario;

    public TokenDto(String token){
        this.token = token;
    }

    public TokenDto(String nome,String tipoUsuario,String token){
        this.nomeCompleto = nome;
        this.token =token;
        this.tipoUsuario = tipoUsuario;
    }

}
