package com.backendProjeto.backendLab.DTOS.Login;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class LoginDto {
    private String emailInstitucional;
    private String senha;
}
