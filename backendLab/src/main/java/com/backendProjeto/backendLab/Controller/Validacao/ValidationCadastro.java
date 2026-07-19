package com.backendProjeto.backendLab.Controller.Validacao;

import com.backendProjeto.backendLab.Service.Cadastro.CadastroService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/validacao")
public class ValidationCadastro {

    private final CadastroService usuarioService;

    public ValidationCadastro(CadastroService usaCadastroService) {
        this.usuarioService = usaCadastroService;
    }

    @RequestMapping(method = RequestMethod.GET,path = "/email")
    public ResponseEntity<?> verificarEmail(@RequestParam String valor){
        usuarioService.verifcarEmailInstitucional(valor);
        return ResponseEntity.ok().build();
    }


    @RequestMapping(method = RequestMethod.GET,path = "/telefone")
    public ResponseEntity<?> verificarTelefone(@RequestParam String valor){
        usuarioService.verificarTelefone(valor);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(method = RequestMethod.GET,path = "/matricula")
    public ResponseEntity<?> verificarMatricula(@RequestParam String valor){
        usuarioService.verificarMatricula(valor);
        return ResponseEntity.ok().build();
    }

}
