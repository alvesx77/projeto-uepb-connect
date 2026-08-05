package com.backendProjeto.backendLab.Controller.CadastrarVagas;

import com.backendProjeto.backendLab.DTOS.Vagas.ReceberVagas;
import com.backendProjeto.backendLab.Model.Vagas.Vagas;
import com.backendProjeto.backendLab.Service.CadastrarVagasService.SalvaVagasService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cadastrarVaga")
public class VagasController {

    private final SalvaVagasService vagasService;

    public VagasController(SalvaVagasService vagasService) {
        this.vagasService = vagasService;
    }

    @PostMapping
    public ResponseEntity<?> cadastrarVaga(
            @RequestBody ReceberVagas dados
    ) {

        try {

            Vagas vaga = vagasService.cadastrarVaga(dados);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(vaga);

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao cadastrar vaga: " + e.getMessage());
        }
    }
}