package com.backendProjeto.backendLab.Service.CadastrarVagasService;

import com.backendProjeto.backendLab.DTOS.Vagas.VagasResponseDto;
import com.backendProjeto.backendLab.Repository.VagasRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class RetornarVagasService {
    private final VagasRepository vagasRepository;

    public RetornarVagasService(VagasRepository vagasRepository) {
        this.vagasRepository = vagasRepository;
    }

    @Transactional(readOnly = true)
    public List<VagasResponseDto> listarVagas() {

        return vagasRepository.findAll(Sort.by(Sort.Direction.DESC, "idVaga"))
                .stream()
                .map(vaga -> new VagasResponseDto(
                        vaga.getIdVaga(),
                        vaga.getEmpresa().getIdEmpresa(),
                        vaga.getEmpresa().getNome(),
                        vaga.getEmpresa().getLocal(),
                        vaga.getNome(),
                        vaga.getArea(),
                        vaga.getLinguagens(),
                        vaga.getFrameworks(),
                        vaga.getTipoEmprego(),
                        vaga.getModoTrabalho(),
                        vaga.getRemuneracao(),
                        vaga.getCargaHoraria(),
                        vaga.getDuracao(),
                        vaga.getBeneficios(),
                        vaga.getInicioPrevisto(),
                        vaga.getSobreVaga(),
                        vaga.getRequisitos(),
                        vaga.getDetalhes()
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public VagasResponseDto buscarPorId(Long id) {

        return vagasRepository.findById(id)
                .map(vaga -> new VagasResponseDto(
                        vaga.getIdVaga(),
                        vaga.getEmpresa().getIdEmpresa(),
                        vaga.getEmpresa().getNome(),
                        vaga.getEmpresa().getLocal(),
                        vaga.getNome(),
                        vaga.getArea(),
                        vaga.getLinguagens(),
                        vaga.getFrameworks(),
                        vaga.getTipoEmprego(),
                        vaga.getModoTrabalho(),
                        vaga.getRemuneracao(),
                        vaga.getCargaHoraria(),
                        vaga.getDuracao(),
                        vaga.getBeneficios(),
                        vaga.getInicioPrevisto(),
                        vaga.getSobreVaga(),
                        vaga.getRequisitos(),
                        vaga.getDetalhes()
                ))
                .orElseThrow(() ->
                        new RuntimeException("Vaga não encontrada")
                );
    }
}
