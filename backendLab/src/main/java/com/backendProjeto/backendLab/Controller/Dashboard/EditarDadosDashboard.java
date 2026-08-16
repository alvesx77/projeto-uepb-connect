package com.backendProjeto.backendLab.Controller.Dashboard;

import com.backendProjeto.backendLab.DTOS.InformacoesDashbord.InformacoesEditarPerfilDto;
import com.backendProjeto.backendLab.Model.Usuarios.*;
import com.backendProjeto.backendLab.Service.AtualizarDados.AtualizarDadosService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/editarDadosPerfil")
public class EditarDadosDashboard {
    private final AtualizarDadosService atualizarDadosService;

    public EditarDadosDashboard(AtualizarDadosService atualizarDadosService){
        this.atualizarDadosService = atualizarDadosService;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> atualizarDados(@AuthenticationPrincipal Usuarios usuario,@Valid @RequestBody InformacoesEditarPerfilDto dtoUsuario){
        Usuarios usuarioAtualizado = atualizarDadosService.AtualizarUsuarios(usuario,dtoUsuario);
        InformacoesEditarPerfilDto dto = new InformacoesEditarPerfilDto(usuarioAtualizado.getEmailInstitucional(),
                usuarioAtualizado.getAreasAfinidade().stream().map(AreasAfinidades::getNome).toList(),
                usuarioAtualizado.getBancoDados().stream().map(BancoDeDados::getNome).toList(),
                usuarioAtualizado.getCloud().stream().map(Clouds::getNome).toList(),
                usuarioAtualizado.getCurriculo(),
                usuarioAtualizado.getCurso(),
                usuarioAtualizado.getFrameworks().stream().map(Framework::getNome).toList(),
                usuarioAtualizado.getLinguagens().stream().map(Linguagem::getNome).toList(),
                usuarioAtualizado.getLinkGithub(),
                usuarioAtualizado.getLinkLinkedin(),
                usuarioAtualizado.getLinkPortifolio(),
                usuarioAtualizado.getMatricula(),
                usuarioAtualizado.getNomeCompleto(),
                usuarioAtualizado.getPeriodo(),
                usuarioAtualizado.getSituacaoEmpregabilidade(),
                usuarioAtualizado.getTelefone(),
                usuarioAtualizado.getVisibilidadePerfil());

        return ResponseEntity.ok(dto);
    }
}
