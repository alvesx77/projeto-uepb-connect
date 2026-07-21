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
    @Pattern(
            regexp = "^[A-Za-zÀ-ÖØ-öø-ÿ']+(\\s[A-Za-zÀ-ÖØ-öø-ÿ']+)+$",
            message = "Informe o nome completo."
    )
    private String nomeCompleto;

    @NotBlank(message = "E-mail institucional é obrigatório")
    @Email(message = "Formato de e-mail inválido")
    @Pattern(
            regexp = "^[\\w.+-]+@(aluno|servidor)\\.uepb\\.edu\\.br$",
            message = "O e-mail deve ser institucional da UEPB"
    )
    private String emailInstitucional;

    @NotBlank(message = "telefone é obrigatorio")
    @Pattern(
            regexp = "^\\(\\d{2}\\)\\d{5}-\\d{4}$",
            message = "Telefone inválido. Use o formato (83)99999-9999"
    )

    private String telefone;

    @NotBlank(message = "senha é obrigatoria")
    @Size(min = 8, message = "senha ter no minino 8 caracteres")
    private String senha;

    @NotBlank(message = "curso é obrigatorio")
    private String curso;

    @NotBlank(message = "periodo é obrigatori")
    private String periodo;

    @NotBlank(message = "matricula é obrigatorio")
    @Pattern(
            regexp = "^\\d{9}$",
            message = "A matrícula deve conter exatamente 9 dígitos."
    )
    private String matricula;

    @Pattern(
            regexp = "^$|^https?://lattes\\.cnpq\\.br/\\d+$",
            message = "Informe uma URL válida do Currículo Lattes."
    )
    private String curriculo;

    @Pattern(
            regexp = "^$|(?i)^https://(www\\.)?github\\.com/[a-zA-Z0-9-]+/?$",
            message = "Informe uma URL válida do GitHub."
    )

    private String linkGithub;

    @Pattern(
            regexp = "^$|(?i)^https://(www\\.)?linkedin\\.com/in/[a-zA-Z0-9-]+/?$",
            message = "Informe uma URL válida do LinkedIn."
    )
    private String linkLinkedin;

    @Pattern(
            regexp = "^$|(?i)^https?://(www\\.)?[a-zA-Z0-9-]+\\.[a-zA-Z]{2,}(/[^\\s]*)?$",
            message = "Informe uma URL válida do portfólio."
    )
    private String linkPortifolio;
    private String situacaoEmpregabilidade;
    private String visibilidadePerfil;

    private List<String> linguagens;
    private List<String> frameworks;
    private List<String> bancoDados;
    private List<String> cloud;
    private List<String> areasAfinidade;
}
