package com.backendProjeto.backendLab.Controller.Validacao;

import com.backendProjeto.backendLab.DTOS.InformaçõesDashbord.InformaçõesDashbordDto;
import com.backendProjeto.backendLab.Model.Usuarios.Linguagem;
import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import com.backendProjeto.backendLab.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/validarToken")
public class ValidarToken {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> validarToken(@AuthenticationPrincipal Usuarios usuarioAutenticado ){

        if (usuarioAutenticado == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("token invalido ou usuario não autenticado");
        }

        List<String> areas = usuarioRepository.buscarNomesAreasAfinidade(usuarioAutenticado.getEmailInstitucional());

        List<String> liguagens = usuarioRepository.buscarNomesLigugens(usuarioAutenticado.getEmailInstitucional());

        InformaçõesDashbordDto dto = new InformaçõesDashbordDto();

        dto.setNomeCompleto(usuarioAutenticado.getNomeCompleto());
        dto.setCurso(usuarioAutenticado.getCurso());
        dto.setSituacaoEmpregabilidade(usuarioAutenticado.getSituacaoEmpregabilidade());
        dto.setPeriodo(usuarioAutenticado.getPeriodo());
        dto.setAreasAfinidades(areas);
        dto.setLinguagens(liguagens);

        return ResponseEntity.ok(dto);
    }
}
