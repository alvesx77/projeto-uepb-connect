package com.backendProjeto.backendLab.Controller.Cadastro;

import com.backendProjeto.backendLab.DTOS.Cadastro.UsuarioDto;
import com.backendProjeto.backendLab.DTOS.Cadastro.UsuarioRespotaCadastroDto;
import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;

import com.backendProjeto.backendLab.Service.Cadastro.CadastroService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/cadastrarUsuario")
public class CadastroUsuarios {

    private final CadastroService usuarioService;

    public CadastroUsuarios(CadastroService usuarioService){
        this.usuarioService = usuarioService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> cadastrarUsuarios(@Valid @RequestBody UsuarioDto usuarioDto){
        Usuarios usuariosSalvos = this.usuarioService.saveUsuarios(usuarioDto);
        UsuarioRespotaCadastroDto usuarioRespotaCadastroDto = new UsuarioRespotaCadastroDto(usuariosSalvos);
        return new ResponseEntity<>(usuarioRespotaCadastroDto,HttpStatus.CREATED);
    }
}
