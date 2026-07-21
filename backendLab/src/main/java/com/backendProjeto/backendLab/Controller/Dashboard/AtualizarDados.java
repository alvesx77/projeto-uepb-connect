package com.backendProjeto.backendLab.Controller.Dashboard;

import com.backendProjeto.backendLab.DTOS.Cadastro.UsuarioDto;
import com.backendProjeto.backendLab.DTOS.InformaçõesDashbord.AtualizarDadosDto;
import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import com.backendProjeto.backendLab.Repository.UsuarioRepository;
import com.backendProjeto.backendLab.Service.AtualizarDados.AtualizarDadosService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/atualizarDados")
public class AtualizarDados {
    @Autowired
    private AtualizarDadosService atualizarDadosService;

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> atualizarDados(@AuthenticationPrincipal Usuarios usuariosAutenticados,@RequestBody AtualizarDadosDto dadosDto){
        if (usuariosAutenticados == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("token invalido ou usuario nao autenticado");
        }
        Usuarios usuarios = atualizarDadosService.atualizarDados(usuariosAutenticados,dadosDto);
        return new ResponseEntity<>("usuario atualizado com sucesso",HttpStatus.OK);

    }

}
