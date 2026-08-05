package com.backendProjeto.backendLab.Service.Excluir;

import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.backendProjeto.backendLab.Repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class PaginasVagas {
    private final UsuarioRepository usuarioRepository;

    public PaginasVagas(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Page<Usuarios> paginasDeUsuarios(){
        Pageable pageable = PageRequest.of(0,5);
        Page<Usuarios> pagina = usuarioRepository.findAll(pageable);
        return pagina;
    }
}
