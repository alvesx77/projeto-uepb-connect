package com.backendProjeto.backendLab.Security;

import com.backendProjeto.backendLab.Repository.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);

        if (token != null){
           try{
               var subject = tokenService.validationToke(token);

               if (subject != null && !subject.isEmpty()){
                   Long id = Long.parseLong(subject);

                   usuarioRepository.findById(id).ifPresent(usuario -> {
                       var authentication = new UsernamePasswordAuthenticationToken(
                               usuario,
                               null,
                               usuario.getAuthorities()
                       );

                       SecurityContextHolder.getContext().setAuthentication(authentication);
                   });
               }
           }
           catch (RuntimeException exception){
               SecurityContextHolder.clearContext();
           }

        }
        filterChain.doFilter(request,response);
    }

    private String recoverToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null){
            return null;
        }
        for (Cookie cookie: cookies){
            if (cookie.getName().equals("accessToken")){
                return cookie.getValue();
            }
        }
        return null;
    }
}
