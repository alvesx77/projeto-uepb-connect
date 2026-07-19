package com.backendProjeto.backendLab.Service.Login;

import com.backendProjeto.backendLab.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class LoginService implements UserDetailsService {
    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            UserDetails userDetails = usuarioRepository.findByEmailInstitucional(username);

            if (userDetails == null){
                throw new UsernameNotFoundException("usuario nao encontrado");
            }

            return userDetails;
    }
}
