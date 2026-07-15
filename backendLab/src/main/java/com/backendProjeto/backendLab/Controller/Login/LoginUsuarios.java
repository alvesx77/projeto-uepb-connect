package com.backendProjeto.backendLab.Controller.Login;

import com.backendProjeto.backendLab.DTOS.Login.LoginDto;
import com.backendProjeto.backendLab.Service.Login.LoginService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/login")
public class LoginUsuarios {

    private final LoginService loginService;

    public LoginUsuarios(LoginService loginService) {
        this.loginService = loginService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDTO) {
        try {
            return new ResponseEntity<>(loginService.autenticar(loginDTO), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
}
