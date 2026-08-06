package com.backendProjeto.backendLab.Controller.CadastrarVagas;

import com.backendProjeto.backendLab.DTOS.Vagas.VagasResponseDto;
import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import com.backendProjeto.backendLab.Service.CanditarVaga.SalvarVagasService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/vagas-salvas")
public class SalvarVagas {

    private final SalvarVagasService vagaSalvaService;

    public SalvarVagas(SalvarVagasService vagaSalvaService) {
        this.vagaSalvaService = vagaSalvaService;
    }

    @GetMapping
    public ResponseEntity<?> listarSalvas(@AuthenticationPrincipal Usuarios usuario) {
        return ResponseEntity.ok(vagaSalvaService.listarIdsVagasSalvas(usuario));
    }

    @GetMapping("/{idVaga}")
    public ResponseEntity<?> verificarSalva(
            @PathVariable Long idVaga,
            @AuthenticationPrincipal Usuarios usuario
    ) {
        boolean salva = vagaSalvaService.estaSalva(usuario, idVaga);
        return ResponseEntity.ok(Map.of("salva", salva));
    }

    @PostMapping("/{idVaga}")
    public ResponseEntity<?> alternarSalvamento(
            @PathVariable Long idVaga,
            @AuthenticationPrincipal Usuarios usuario
    ) {
        boolean salva = vagaSalvaService.alternarSalvamento(usuario, idVaga);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("salva", salva));
    }

    @GetMapping("/detalhes")
    public ResponseEntity<?> listarVagasSalvasCompletas(@AuthenticationPrincipal Usuarios usuario) {

        List<VagasResponseDto> vagas = vagaSalvaService.listarVagasSalvas(usuario)
                .stream()
                .map(VagasResponseDto::fromEntity) // reaproveitando o DTO que você já tem
                .toList();

        return ResponseEntity.ok(vagas);
    }

}
