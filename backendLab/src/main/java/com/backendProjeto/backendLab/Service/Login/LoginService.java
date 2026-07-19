package com.backendProjeto.backendLab.Service.Login;

import com.backendProjeto.backendLab.DTOS.Login.LoginDto;
import com.backendProjeto.backendLab.DTOS.Login.RespostaUsuarioLoginDto;
import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import com.backendProjeto.backendLab.Repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class LoginService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginService(UsuarioRepository usuarioRepository,PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public RespostaUsuarioLoginDto autenticar(LoginDto loginDto){
        Optional<Usuarios> usuarios = usuarioRepository.findByEmailInstitucional(loginDto.getEmailInstitucional());
        if (usuarios.isEmpty()){
            throw new RuntimeException("E-mail ou senha inválidos");
        }
        Usuarios usuario = usuarios.get();
        if (!passwordEncoder.matches(loginDto.getSenha(),usuario.getSenha())){
            throw new RuntimeException("E-mail ou senha inválidos");
        }
        return new RespostaUsuarioLoginDto(usuario);
    }
}
