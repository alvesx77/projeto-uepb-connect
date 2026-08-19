package com.backendProjeto.backendLab.Model.Vagas;

public enum TipoEmprego {
    //enum('Estagio','Trainee','CLT','PJ','Freelancer','Temporario')
    ESTAGIO("ESTAGIO"),
    TRAINEE("TRAINEE"),
    CLT("CLT"),
    PJ("PJ"),
    FREELANCER("FREELANCER"),
    TEMPORARIO("TEMPORARIO");

    private String role;

    TipoEmprego(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}
