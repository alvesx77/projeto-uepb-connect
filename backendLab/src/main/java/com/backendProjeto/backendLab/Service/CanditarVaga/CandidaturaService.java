package com.backendProjeto.backendLab.Service.CanditarVaga;

import com.backendProjeto.backendLab.Erros.DadoDuplicadoException;
import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import com.backendProjeto.backendLab.Model.Vagas.Candidatura;
import com.backendProjeto.backendLab.Model.Vagas.Vagas;
import com.backendProjeto.backendLab.Repository.CandidaturaRepository;
import com.backendProjeto.backendLab.Repository.VagasRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CandidaturaService {
    private final CandidaturaRepository candidaturaRepository;
    private final VagasRepository vagasRepository;

    public CandidaturaService(
        CandidaturaRepository candidaturaRepository,
        VagasRepository vagasRepository
    ){
        this.candidaturaRepository = candidaturaRepository;
        this.vagasRepository = vagasRepository;
    }

    @Transactional
    public Candidatura candidatar(Usuarios usuarioLogado, Long idVaga){
        if (candidaturaRepository.existsByUsuario_IdAndVaga_IdVaga(usuarioLogado.getId(),idVaga))
            throw  new DadoDuplicadoException("voce ja se candidatou a essa vaga");

        Vagas vagas = vagasRepository.findById(idVaga)
                .orElseThrow(() -> new IllegalArgumentException("vaga nao encontrada"));

        Candidatura candidatura = new Candidatura();
        candidatura.setUsuario(usuarioLogado);
        candidatura.setVaga(vagas);

        return candidaturaRepository.save(candidatura);
    }
}

