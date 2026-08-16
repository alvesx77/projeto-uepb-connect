package com.backendProjeto.backendLab.Controller.Dashboard;

import com.backendProjeto.backendLab.DTOS.InformacoesDashbord.InformacoesEditarPerfilDto;
import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import com.backendProjeto.backendLab.Repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/retornarDadosEditarPerfil")
public class RetornarDadosEditarPerfil {

    private final UsuarioRepository usuarioRepository;

    public RetornarDadosEditarPerfil(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> retornarDadosEditarPerfil(@AuthenticationPrincipal Usuarios usuarioAutenticado){

        if (usuarioAutenticado == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("token invalido ou usuario não autenticado");
        }

        InformacoesEditarPerfilDto dto = new InformacoesEditarPerfilDto();

        dto.setNomeCompleto(usuarioAutenticado.getNomeCompleto());
        dto.setEmailInstitucional(usuarioAutenticado.getEmailInstitucional());
        dto.setTelefone(usuarioAutenticado.getTelefone());
        dto.setCurso(usuarioAutenticado.getCurso());
        dto.setPeriodo(usuarioAutenticado.getPeriodo());
        dto.setMatricula(usuarioAutenticado.getMatricula());
        dto.setCurriculo(usuarioAutenticado.getCurriculo());
        dto.setLinkGithub(usuarioAutenticado.getLinkGithub());
        dto.setLinkLinkedin(usuarioAutenticado.getLinkLinkedin());
        dto.setLinkPortifolio(usuarioAutenticado.getLinkPortifolio());
        dto.setSituacaoEmpregabilidade(usuarioAutenticado.getSituacaoEmpregabilidade());
        dto.setVisibilidadePerfil(usuarioAutenticado.getVisibilidadePerfil());

        List<String> areasAfinidade = usuarioRepository.buscarNomesAreasAfinidade(usuarioAutenticado.getEmailInstitucional());
        List<String> linguagens = usuarioRepository.buscarNomesLigugens(usuarioAutenticado.getEmailInstitucional());
        List<String> frameworks = usuarioRepository.buscarNomesFrameworks(usuarioAutenticado.getEmailInstitucional());
        List<String> cloud = usuarioRepository.buscarNomesClouds(usuarioAutenticado.getEmailInstitucional());
        List<String> bancoDados = usuarioRepository.buscarNomesBancosDados(usuarioAutenticado.getEmailInstitucional());

        dto.setAreasAfinidade(areasAfinidade);
        dto.setLinguagens(linguagens);
        dto.setFrameworks(frameworks);
        dto.setCloud(cloud);
        dto.setBancoDados(bancoDados);

        return new ResponseEntity<>(dto,HttpStatus.OK);
    }
}
