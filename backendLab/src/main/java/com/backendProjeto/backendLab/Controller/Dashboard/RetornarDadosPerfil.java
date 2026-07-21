package com.backendProjeto.backendLab.Controller.Dashboard;


import com.backendProjeto.backendLab.DTOS.InformaçõesDashbord.InformacoesPefilDto;
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
@RequestMapping("/retornarDadosPerfil")
public class RetornarDadosPerfil {

    private final UsuarioRepository usuarioRepository;

    public RetornarDadosPerfil(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> retornarDadosPerfil(@AuthenticationPrincipal Usuarios usuarioAutenticado){
        if (usuarioAutenticado == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("token invalido ou usuario não autenticado");
        }

        List<String> areasAfinidades = usuarioRepository.buscarNomesAreasAfinidade(usuarioAutenticado.getEmailInstitucional());
        List<String> linguagens = usuarioRepository.buscarNomesLigugens(usuarioAutenticado.getEmailInstitucional());
        List<String> frameworks = usuarioRepository.buscarNomesFrameworks(usuarioAutenticado.getEmailInstitucional());
        List<String> clouds = usuarioRepository.buscarNomesClouds(usuarioAutenticado.getEmailInstitucional());
        List<String> bancoDados = usuarioRepository.buscarNomesBancosDados(usuarioAutenticado.getEmailInstitucional());

        InformacoesPefilDto dto = new InformacoesPefilDto();

        dto.setNomeCompleto(usuarioAutenticado.getNomeCompleto());
        dto.setCurso(usuarioAutenticado.getCurso());
        dto.setSituacaoEmpregabilidade(usuarioAutenticado.getSituacaoEmpregabilidade());
        dto.setPeriodo(usuarioAutenticado.getPeriodo());
        dto.setEmailInstitucional(usuarioAutenticado.getEmailInstitucional());
        dto.setTelefone(usuarioAutenticado.getTelefone());
        dto.setMatricula(usuarioAutenticado.getMatricula());
        dto.setCurriculo(usuarioAutenticado.getCurriculo());
        dto.setLinkLinkedin(usuarioAutenticado.getLinkLinkedin());
        dto.setLinkGithub(usuarioAutenticado.getLinkGithub());
        dto.setLinkPortifolio(usuarioAutenticado.getLinkPortifolio());
        dto.setVisibilidadePerfil(usuarioAutenticado.getVisibilidadePerfil());

        dto.setAreasAfinidades(areasAfinidades);
        dto.setLinguagens(linguagens);
        dto.setFrameworks(frameworks);
        dto.setCloud(clouds);
        dto.setBancoDados(bancoDados);

        return ResponseEntity.ok(dto);
    }
}
