package com.backendProjeto.backendLab.Model.Vagas;

public enum ModoTrabalho {
    //enum('Presencial','Hibrido','Remoto')
    PRESENCIAL("PRESENCIAL"),
    HIBRIDO("HIBRIDO"),
    REMOTO("REMOTO");

    private String role;

    ModoTrabalho(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }

}
