package com.backendProjeto.backendLab.Service.RetornarVagasPaginadas;

import com.backendProjeto.backendLab.DTOS.Vagas.PaginasResponse;
import com.backendProjeto.backendLab.DTOS.Vagas.VagasResponseDto;
import com.backendProjeto.backendLab.Model.Vagas.Vagas;
import com.backendProjeto.backendLab.Repository.VagasRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class PaginasVagas {
    private final VagasRepository vagasRepository;

    public PaginasVagas(VagasRepository vagasRepository) {
        this.vagasRepository = vagasRepository;
    }

    public PaginasResponse<VagasResponseDto> paginasDeVagasDashboar(){
        Pageable pageable = PageRequest.of(0,3, Sort.by(Sort.Direction.DESC,"idVaga"));
        Page<Vagas> pagina = vagasRepository.findAll(pageable);

        Page<VagasResponseDto> vagas = pagina.map(this::toDto);

        return new PaginasResponse<>(
                vagas.getContent(),
                vagas.getNumber(),
                vagas.getTotalPages(),
                vagas.getTotalElements()
        );
    }

    public PaginasResponse<VagasResponseDto> paginasDeAreasDeAfinidades(String area){
        Pageable pageable = PageRequest.of(0,2,Sort.by(Sort.Direction.DESC,"idVaga"));
        Page<Vagas> pagina = vagasRepository.findByArea(area,pageable);

        Page<VagasResponseDto> vagas = pagina.map(this::toDto);

        return new PaginasResponse<>(
                vagas.getContent(),
                vagas.getNumber(),
                vagas.getTotalPages(),
                vagas.getTotalElements()
        );
    }

    private VagasResponseDto toDto(Vagas vaga){
        return new VagasResponseDto(
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
        );
    }
}
