package com.backendProjeto.backendLab.DTOS.InformaçõesDashbord;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class AtualizarDadosDto {

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

    @Pattern(
            regexp = "^\\(\\d{2}\\)\\d{5}-\\d{4}$",
            message = "Telefone inválido. Use o formato (83)99999-9999"
    )
    private String telefone;

    private String curso;
    private String periodo;

    @Pattern(
            regexp = "^\\d{9}$",
            message = "A matrícula deve conter exatamente 9 dígitos."
    )
    private String matricula;

    @Pattern(
            regexp = "^https?://lattes\\.cnpq\\.br/\\d+$",
            message = "Informe uma URL válida do Currículo Lattes."
    )
    private String curriculo;

    private String situacaoEmpregabilidade;

    private List<String> areasAfinidade;

    private List<String> linguagens;
    private List<String> frameworks;
    private List<String> bancoDados;
    private List<String> cloud;

    @Pattern(
            regexp = "(?i)^https://(www\\.)?linkedin\\.com/in/[a-zA-Z0-9-]+/?$",
            message = "Informe uma URL válida do LinkedIn."
    )
    private String linkLinkedin;

    @Pattern(
            regexp = "(?i)^https://(www\\.)?github\\.com/[a-zA-Z0-9-]+/?$",
            message = "Informe uma URL válida do GitHub."
    )
    private String linkGithub;

    @Pattern(
            regexp = "(?i)^https?://(www\\.)?[a-zA-Z0-9-]+\\.[a-zA-Z]{2,}(/[^\\s]*)?$",
            message = "Informe uma URL válida do portfólio."
    )
    private String linkPortifolio;

    private String visibilidade;

    public AtualizarDadosDto(
            String nomeCompleto,
            String emailInstitucional,
            String telefone,
            String curso,
            String periodo,
            String matricula,
            String curriculo,
            String situacaoEmpregabilidade,
            List<String> areasAfinidade,
            List<String> linguagens,
            List<String> frameworks,
            List<String> bancoDados,
            List<String> cloud,
            String linkLinkedin,
            String linkGithub,
            String linkPortifolio,
            String visibilidade
            ){
        this.nomeCompleto = nomeCompleto;
        this.emailInstitucional = emailInstitucional;
        this.telefone = telefone;
        this.curso = curso;
        this.periodo = periodo;
        this.matricula = matricula;
        this.curriculo = curriculo;
        this.situacaoEmpregabilidade = situacaoEmpregabilidade;
        this.areasAfinidade = areasAfinidade;
        this.linguagens = linguagens;
        this.frameworks = frameworks;
        this.bancoDados = bancoDados;
        this.cloud = cloud;
        this.linkLinkedin = linkLinkedin;
        this.linkGithub = linkGithub;
        this.linkPortifolio = linkPortifolio;
        this.visibilidade = visibilidade;
    }

}
