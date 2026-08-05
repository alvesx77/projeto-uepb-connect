package com.backendProjeto.backendLab.Service.CadastrarVagasService;

import com.backendProjeto.backendLab.DTOS.Vagas.ReceberVagas;
import com.backendProjeto.backendLab.Model.Vagas.Empresas;
import com.backendProjeto.backendLab.Model.Vagas.Vagas;
import com.backendProjeto.backendLab.Repository.EmpresasRepository;
import com.backendProjeto.backendLab.Repository.VagasRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SalvaVagasService {

    private final VagasRepository vagasRepository;
    private final EmpresasRepository empresasRepository;

    public SalvaVagasService(
            VagasRepository vagasRepository,
            EmpresasRepository empresasRepository
    ) {
        this.vagasRepository = vagasRepository;
        this.empresasRepository = empresasRepository;
    }

    @Transactional
    public Vagas cadastrarVaga(ReceberVagas dados) {

        // Procura empresa pelo nome
        Empresas empresa = empresasRepository
                .findByNome(dados.getNome())
                .orElseGet(() -> {

                    Empresas novaEmpresa = new Empresas();

                    novaEmpresa.setNome(dados.getNome());
                    novaEmpresa.setLocal(dados.getLocal());

                    return empresasRepository.save(novaEmpresa);
                });

        // Cria a vaga
        Vagas vaga = new Vagas();

        vaga.setEmpresa(empresa);
        vaga.setNome(dados.getNomeVaga());
        vaga.setArea(dados.getArea());

        // Transforma a lista em String
        vaga.setLinguagens(
                dados.getLinguagens() != null
                        ? String.join(", ", dados.getLinguagens())
                        : null
        );

        vaga.setFrameworks(
                dados.getFrameworks() != null
                        ? String.join(", ", dados.getFrameworks())
                        : null
        );

        vaga.setTipoEmprego(dados.getTipoEmprego());
        vaga.setModoTrabalho(dados.getModoTrabalho());

        vaga.setRemuneracao(dados.getRemuneracao());
        vaga.setCargaHoraria(dados.getCargaHoraria());
        vaga.setDuracao(dados.getDuracao());
        vaga.setBeneficios(dados.getBeneficios());
        vaga.setInicioPrevisto(dados.getInicioPrevisto());

        vaga.setSobreVaga(dados.getSobreVaga());
        vaga.setRequisitos(dados.getRequisitos());
        vaga.setDetalhes(dados.getDetalhes());

        return vagasRepository.save(vaga);
    }
}