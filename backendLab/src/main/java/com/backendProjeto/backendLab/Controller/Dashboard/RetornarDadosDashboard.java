package com.backendProjeto.backendLab.Controller.Dashboard;

import com.backendProjeto.backendLab.DTOS.InformacoesDashbord.InformacoesDashbordDto;
import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import com.backendProjeto.backendLab.Repository.CandidaturaRepository;
import com.backendProjeto.backendLab.Repository.UsuarioRepository;
import com.backendProjeto.backendLab.Repository.VagaSalvaRepository;
import com.backendProjeto.backendLab.Repository.VagasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/retornarDadosDashboard")
public class RetornarDadosDashboard {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CandidaturaRepository candidaturaRepository;

    @Autowired
    private VagasRepository vagasRepository;

    @Autowired
    private VagaSalvaRepository vagaSalvaRepository;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> retornaDados(@AuthenticationPrincipal Usuarios usuarioAutenticado ){

        if (usuarioAutenticado == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("token invalido ou usuario não autenticado");
        }

        List<String> areas = usuarioRepository.buscarNomesAreasAfinidade(usuarioAutenticado.getEmailInstitucional());

        List<String> liguagens = usuarioRepository.buscarNomesLigugens(usuarioAutenticado.getEmailInstitucional());

        List<String> frameworks = usuarioRepository.buscarNomesFrameworks(usuarioAutenticado.getEmailInstitucional());

        List<String> clouds = usuarioRepository.buscarNomesClouds(usuarioAutenticado.getEmailInstitucional());

        List<String> bancoDados = usuarioRepository.buscarNomesBancosDados(usuarioAutenticado.getEmailInstitucional());

        long quantidadeVagas = vagasRepository.count();

        long candidaturas =
                candidaturaRepository.countByUsuario_Id(
                        usuarioAutenticado.getId()
                );

        long vagasSalvas =
                vagaSalvaRepository.countByUsuario_Id(
                        usuarioAutenticado.getId()
                );

        InformacoesDashbordDto dto = new InformacoesDashbordDto();

        dto.setNomeCompleto(usuarioAutenticado.getNomeCompleto());
        dto.setCurso(usuarioAutenticado.getCurso());
        dto.setSituacaoEmpregabilidade(usuarioAutenticado.getSituacaoEmpregabilidade());
        dto.setPeriodo(usuarioAutenticado.getPeriodo());
        dto.setAreasAfinidades(areas);
        dto.setLinguagens(liguagens);
        dto.setFrameworks(frameworks);
        dto.setClouds(clouds);
        dto.setBancoDados(bancoDados);
        dto.setQuantidadeVagas(quantidadeVagas);
        dto.setQuantidadeCandidaturas(candidaturas);
        dto.setQuantidadeVagasSalvas(vagasSalvas);

        return ResponseEntity.ok(dto);
    }
}
