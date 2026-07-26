package com.backendProjeto.backendLab.Controller.Vagas;

import com.backendProjeto.backendLab.Service.ServicePaginacaoVagas.PaginasVagas;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/vagas")
public class Vagas {

    private final PaginasVagas usuariosPages;

    public Vagas(PaginasVagas usuariosPages) {
        this.usuariosPages = usuariosPages;
    }


    @RequestMapping(value = "/retorenarVagas",method = RequestMethod.GET)
    public ResponseEntity<?> retornarVagsPages(){
        return new ResponseEntity<>(usuariosPages.paginasDeUsuarios(),HttpStatus.OK);
    }

    @RequestMapping(value = "/adicionarVagas",method = RequestMethod.POST)
    public ResponseEntity<?> adicionarVaga(){
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
