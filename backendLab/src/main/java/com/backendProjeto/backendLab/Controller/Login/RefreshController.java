package com.backendProjeto.backendLab.Controller.Login;

import com.backendProjeto.backendLab.DTOS.Login.TokenDto;
import com.backendProjeto.backendLab.Model.Usuarios.RefreshToken;
import com.backendProjeto.backendLab.Security.TokenService;
import com.backendProjeto.backendLab.Service.RefreshTokenService.RefreshTokenService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
@RequestMapping("/auth")
public class RefreshController {
    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(
            @CookieValue(name = "refreshToken",required = false) String refreshToken,
            HttpServletResponse response){

            if (refreshToken == null){
                return new ResponseEntity<>("Sem refresh token", HttpStatus.UNAUTHORIZED);
            }
            var tokenOpt = refreshTokenService.validar(refreshToken);

            if (tokenOpt.isEmpty()){
                return new ResponseEntity<>("token invalido ou expirado",HttpStatus.FORBIDDEN);
            }

            RefreshToken tokenEnity = tokenOpt.get();
            var usario = tokenEnity.getUsuarios();

            // rotação: revoga o antigo, gera um novo
            refreshTokenService.revogar(refreshToken);
            String novoRefreshToken = refreshTokenService.gerarSalvar(usario);
            String novoAccessToken = tokenService.generateToken(usario);

            ResponseCookie cookie = ResponseCookie.from("refreshToken",novoRefreshToken)
                    .httpOnly(true)
                    .secure(false)
                    .sameSite("Lax")
                    .path("/")
                    .maxAge(Duration.ofDays(7))
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE,cookie.toString());

            return new ResponseEntity<>(new TokenDto(novoAccessToken),HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            @CookieValue(name = "refreshToken",required = false)
            String refreshToken,
            HttpServletResponse response){

        if (refreshToken != null){
            refreshTokenService.revogar(refreshToken);
        }

        ResponseCookie cookie = ResponseCookie.from("refreshToken","")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE,cookie.toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
