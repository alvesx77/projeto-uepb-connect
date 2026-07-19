package com.backendProjeto.backendLab.Controller.Login;
import com.backendProjeto.backendLab.DTOS.Login.LoginDto;
import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import com.backendProjeto.backendLab.Security.TokenService;
import com.backendProjeto.backendLab.Service.RefreshTokenService.RefreshTokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/login")
public class LoginUsuarios {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto){
        try {
            var userNamePassword = new UsernamePasswordAuthenticationToken(loginDto.getEmailInstitucional(),loginDto.getSenha());
            var auth = this.authenticationManager.authenticate(userNamePassword);
            var usuario = (Usuarios) auth.getPrincipal();

            var accsseToken = tokenService.generateToken(usuario);
            var refreshToken = refreshTokenService.gerarSalvar(usuario);

            ResponseCookie accessCookie = ResponseCookie.from("accessToken",accsseToken)
                    .httpOnly(true)
                    .secure(false)
                    .sameSite("Lax")
                    .path("/")
                    .maxAge(Duration.ofHours(2))
                    .build();

            ResponseCookie refreshCookie = ResponseCookie.from("refreshToken",refreshToken)
                    .httpOnly(true)
                    .secure(false)
                    .sameSite("Lax")
                    .path("/")
                    .maxAge(Duration.ofDays(7))
                    .build();
            return ResponseEntity.ok()
                    .headers(hesaders -> {
                        hesaders.add(
                                HttpHeaders.SET_COOKIE,
                                accessCookie.toString()
                        );
                        hesaders.add(
                                HttpHeaders.SET_COOKIE,
                                refreshCookie.toString()
                        );
                    })
                    .body("Login realizado com sucesso e token salvo");
        }
        catch (AuthenticationException erro){
            return new ResponseEntity<>("E-mail ou senha invalida",HttpStatus.BAD_REQUEST);
        }

    }

}
