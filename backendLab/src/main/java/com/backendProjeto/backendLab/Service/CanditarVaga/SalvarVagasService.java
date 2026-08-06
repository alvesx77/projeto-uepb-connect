package com.backendProjeto.backendLab.Service.CanditarVaga;

import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import com.backendProjeto.backendLab.Model.Vagas.SalvarVagas;
import com.backendProjeto.backendLab.Model.Vagas.Vagas;
import com.backendProjeto.backendLab.Repository.VagaSalvaRepository;
import com.backendProjeto.backendLab.Repository.VagasRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalvarVagasService {

    private final VagaSalvaRepository vagaSalvaRepository;
    private final VagasRepository vagasRepository;

    public SalvarVagasService(
            VagaSalvaRepository vagaSalvaRepository,
            VagasRepository vagasRepository
    ) {
        this.vagaSalvaRepository = vagaSalvaRepository;
        this.vagasRepository = vagasRepository;
    }

    @Transactional
    public boolean alternarSalvamento(Usuarios usuarioLogado, Long idVaga) {

        Optional<SalvarVagas> existente =
                vagaSalvaRepository.findByUsuario_IdAndVaga_IdVaga(usuarioLogado.getId(), idVaga);

        if (existente.isPresent()) {
            vagaSalvaRepository.delete(existente.get());
            return false; // agora está "não salva"
        }

        Vagas vaga = vagasRepository.findById(idVaga)
                .orElseThrow(() -> new IllegalArgumentException("vaga nao encontrada"));

        SalvarVagas vagaSalva = new SalvarVagas();
        vagaSalva.setUsuario(usuarioLogado);
        vagaSalva.setVaga(vaga);

        vagaSalvaRepository.save(vagaSalva);
        return true; // agora está "salva"
    }

    public boolean estaSalva(Usuarios usuarioLogado, Long idVaga) {
        return vagaSalvaRepository.existsByUsuario_IdAndVaga_IdVaga(usuarioLogado.getId(), idVaga);
    }

    public List<Long> listarIdsVagasSalvas(Usuarios usuarioLogado) {
        return vagaSalvaRepository.findByUsuario_Id(usuarioLogado.getId())
                .stream()
                .map(vs -> vs.getVaga().getIdVaga())
                .toList();
    }

    public List<Vagas> listarVagasSalvas(Usuarios usuarioLogado) {
        return vagaSalvaRepository.findByUsuario_Id(usuarioLogado.getId())
                .stream()
                .map(SalvarVagas::getVaga)
                .toList();
    }

}
