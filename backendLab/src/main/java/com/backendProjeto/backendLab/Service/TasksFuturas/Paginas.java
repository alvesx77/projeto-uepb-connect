package com.backendProjeto.backendLab.Service.TasksFuturas;

import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.backendProjeto.backendLab.Repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Paginas {
    private final UsuarioRepository usuarioRepository;

    public Paginas(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Page<Usuarios> paginasDeUsuarios(){
        Pageable pageable = PageRequest.of(0,2);
        Page<Usuarios> pagina = usuarioRepository.findAll(pageable);
        return pagina;
    }
}
