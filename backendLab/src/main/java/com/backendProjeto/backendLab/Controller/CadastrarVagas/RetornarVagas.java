package com.backendProjeto.backendLab.Controller.CadastrarVagas;

import com.backendProjeto.backendLab.DTOS.Vagas.VagasResponseDto;
import com.backendProjeto.backendLab.Service.CadastrarVagasService.RetornarVagasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/vagas")
public class RetornarVagas {

    private final RetornarVagasService vagasService;

    public RetornarVagas(RetornarVagasService vagasService) {
        this.vagasService = vagasService;
    }

    @GetMapping("/salvas")
    public ResponseEntity<List<VagasResponseDto>> listarVagas() {

        List<VagasResponseDto> vagas = vagasService.listarVagas();

        return ResponseEntity.ok(vagas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VagasResponseDto> buscarVaga(@PathVariable Long id
    ) {

        VagasResponseDto vaga =
                vagasService.buscarPorId(id);

        return ResponseEntity.ok(vaga);
    }

}
