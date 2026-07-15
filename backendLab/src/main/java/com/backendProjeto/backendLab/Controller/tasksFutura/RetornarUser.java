package com.backendProjeto.backendLab.Controller.tasksFutura;

import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import com.backendProjeto.backendLab.Service.TasksFuturas.Paginas;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/users")
public class RetornarUser {

    private final Paginas usuariosPages;

    public RetornarUser(Paginas usuariosPages) {
        this.usuariosPages = usuariosPages;
    }


    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> retornarUsuariosPages(){
        return new ResponseEntity<>(usuariosPages.paginasDeUsuarios(),HttpStatus.OK);
    }
}
