package com.backendProjeto.backendLab.DTOS.Cadastro;

import com.backendProjeto.backendLab.Model.Usuarios.*;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UsuarioDto {

    @NotBlank(message = "nome completo é obrigatorio")
    private String nomeCompleto;

    @NotBlank(message = "E-mail institucional é obrigatorio")
    @Email(message = "email institucional invalido")
    private String emailInstitucional;

    @NotBlank(message = "telefone é obrigatorio")
    private String telefone;

    @NotBlank(message = "senha é obrigatoria")
    @Size(min = 8, message = "senha ter no minino 8 caracteres")
    private String senha;

    @NotBlank(message = "curso é obrigatorio")
    private String curso;

    @NotBlank(message = "periodo é obrigatori")
    private String periodo;

    @NotBlank(message = "matricula é obrigatorio")
    private String matricula;
    private String curriculo;
    private String linkGithub;
    private String linkLinkedin;
    private String linkPortifolio;
    private String situacaoEmpregabilidade;
    private String visibilidadePerfil;

    private List<String> linguagens;
    private List<String> frameworks;
    private List<String> bancoDados;
    private List<String> cloud;
    private List<String> areasAfinidade;
}
