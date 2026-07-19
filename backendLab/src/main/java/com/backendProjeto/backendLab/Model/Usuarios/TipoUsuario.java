package com.backendProjeto.backendLab.Model.Usuarios;

public enum TipoUsuario {
    ADMIN("ADMIN"),
    ALUNO("ALUNO");

    private String role;

    TipoUsuario(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}
