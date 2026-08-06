package com.backendProjeto.backendLab.Controller.CadastrarVagas;

import com.backendProjeto.backendLab.DTOS.Vagas.CandidaturaResponseDto;
import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import com.backendProjeto.backendLab.Model.Vagas.Candidatura;
import com.backendProjeto.backendLab.Service.CanditarVaga.CandidaturaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/candidaturas")
public class CandidatarVagas {

    private final CandidaturaService candidaturaService;

    public CandidatarVagas(CandidaturaService candidaturaService){
        this.candidaturaService = candidaturaService;
    }

    @RequestMapping(value = "/{idVaga}", method = RequestMethod.POST)
    public ResponseEntity<?> candidatura(
            @PathVariable Long idVaga,
            @AuthenticationPrincipal Usuarios usuario
            ){
        Candidatura candidatura = candidaturaService.candidatar(usuario,idVaga);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(CandidaturaResponseDto.fromEntity(candidatura));
    }

}
