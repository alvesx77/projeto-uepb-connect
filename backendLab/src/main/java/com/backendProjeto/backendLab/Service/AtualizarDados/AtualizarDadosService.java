package com.backendProjeto.backendLab.Service.AtualizarDados;

import com.backendProjeto.backendLab.DTOS.InformaçõesDashbord.AtualizarDadosDto;
import com.backendProjeto.backendLab.Erros.DadoDuplicadoException;
import com.backendProjeto.backendLab.Erros.ResourceNotFoundException;
import com.backendProjeto.backendLab.Model.Usuarios.*;
import com.backendProjeto.backendLab.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AtualizarDadosService {


    private final UsuarioRepository usuarioRepository;
    private final LinguagemRepository linguagemRepository;
    private final FramewokRepository framewokRepository;
    private final BancoDeDadosRepository bancoDeDadosRepository;
    private final CloudRepository cloudRepository;
    private final AreasAfinidadeRepository areasAfinidadeRepository;


    public AtualizarDadosService(UsuarioRepository usuarioRepository,
                                 LinguagemRepository linguagemRepository,
                                 FramewokRepository framewokRepository,
                                 BancoDeDadosRepository bancoDeDadosRepository,
                                 CloudRepository cloudRepository,
                                 AreasAfinidadeRepository areasAfinidadeRepository){
        this.usuarioRepository = usuarioRepository;
        this.linguagemRepository = linguagemRepository;
        this.framewokRepository = framewokRepository;
        this.bancoDeDadosRepository = bancoDeDadosRepository;
        this.cloudRepository = cloudRepository;
        this.areasAfinidadeRepository = areasAfinidadeRepository;
    }

    public Usuarios atualizarDados(Usuarios usuarios,AtualizarDadosDto dadosDto){
        Usuarios usuarioRetornados = usuarioRepository.findByEmailInstitucional(usuarios.getEmailInstitucional());

        if (usuarioRetornados == null){
            throw  new ResourceNotFoundException("usuario nao encontrado");
        }

        if (dadosDto.getNomeCompleto() != null){
            usuarioRetornados.setNomeCompleto(dadosDto.getNomeCompleto());
        }

        if (dadosDto.getEmailInstitucional() != null && !dadosDto.getEmailInstitucional().equals(usuarioRetornados.getEmailInstitucional())){
                if (usuarioRepository.existsByEmailInstitucional(dadosDto.getEmailInstitucional())){
                    throw new DadoDuplicadoException("ja existe um usuario com esse email");
                }
                usuarioRetornados.setEmailInstitucional(dadosDto.getEmailInstitucional());
        }

        if (dadosDto.getTelefone() != null && !dadosDto.getTelefone().equals(usuarioRetornados.getTelefone())){
            if (usuarioRepository.existsByTelefone(dadosDto.getTelefone())){
                throw new DadoDuplicadoException("ja existe um usuario com esse telefone");
            }
            usuarioRetornados.setTelefone(dadosDto.getTelefone());
        }

        if (dadosDto.getCurso() != null){
            usuarioRetornados.setCurso(dadosDto.getCurso());
        }

        if (dadosDto.getPeriodo() != null){
            usuarioRetornados.setPeriodo(dadosDto.getPeriodo());
        }

        if (dadosDto.getMatricula() != null && !dadosDto.getMatricula().equals(usuarioRetornados.getMatricula())){
            if (usuarioRepository.existsByMatricula(dadosDto.getMatricula())){
                throw new DadoDuplicadoException("ja existe um usario com essa matriculad");
            }
            usuarioRetornados.setMatricula(dadosDto.getMatricula());
        }

        if (dadosDto.getCurriculo() != null){
            usuarioRetornados.setCurriculo(dadosDto.getCurriculo());
        }

        if (dadosDto.getSituacaoEmpregabilidade() != null){
            usuarioRetornados.setSituacaoEmpregabilidade(dadosDto.getSituacaoEmpregabilidade());
        }

        if (dadosDto.getAreasAfinidade() != null){
            usuarioRetornados.setAreasAfinidade(resolverAreasAfinidades(dadosDto.getAreasAfinidade()));
        }

        if (dadosDto.getLinguagens() != null){
            usuarioRetornados.setLinguagens(resolerLinguagens(dadosDto.getLinguagens()));
        }

        if (dadosDto.getFrameworks() != null){
            usuarioRetornados.setFrameworks(resolverFramework(dadosDto.getFrameworks()));
        }

        if (dadosDto.getCloud() != null){
            usuarioRetornados.setCloud(resolverClouds(dadosDto.getCloud()));
        }

        if (dadosDto.getBancoDados() != null){
            usuarioRetornados.setBancoDados(resolverBancoDados(dadosDto.getBancoDados()));
        }

        if (dadosDto.getLinkLinkedin() != null){
            usuarioRetornados.setLinkLinkedin(dadosDto.getLinkLinkedin());
        }

        if (dadosDto.getLinkGithub() != null){
            usuarioRetornados.setLinkGithub(dadosDto.getLinkGithub());
        }

        if (dadosDto.getLinkPortifolio() != null){
            usuarioRetornados.setLinkPortifolio(dadosDto.getLinkPortifolio());
        }

        if (dadosDto.getVisibilidade() != null){
            usuarioRetornados.setVisibilidadePerfil(dadosDto.getVisibilidade());
        }

        return usuarioRepository.save(usuarioRetornados);
    }

    private List<AreasAfinidades> resolverAreasAfinidades(List<String> nomes){
        return nomes == null ? List.of() : nomes.stream()
                .map(nome -> areasAfinidadeRepository.findByNome(nome)
                        .orElseGet(() ->{
                            AreasAfinidades novo = new AreasAfinidades();
                            novo.setNome(nome);
                            return novo;
                        }))
                .toList();

    }

    private List<Linguagem> resolerLinguagens (List<String> nomes){
        return nomes == null ? List.of() : nomes.stream()
                .map(nome -> linguagemRepository.findByNome(nome)
                        .orElseGet(() ->{
                            Linguagem novo = new Linguagem();
                            novo.setNome(nome);
                            return novo;
                        }))
                .toList();
    }

    private List<Framework> resolverFramework(List<String> nomes){
        return nomes == null ? List.of() : nomes.stream()
                .map( nome -> framewokRepository.findByNome(nome)
                        .orElseGet(() ->{
                            Framework novo = new Framework();
                            novo.setNome(nome);
                            return novo;
                        }))
                .toList();
    }

    private List<Clouds> resolverClouds(List<String> nomes){
        return nomes == null ? List.of() : nomes.stream()
                .map(nome -> cloudRepository.findByNome(nome)
                        .orElseGet(() -> {
                            Clouds novo = new Clouds();
                            novo.setNome(nome);
                            return novo;
                        }))
                .toList();
    }

    private List<BancoDeDados> resolverBancoDados(List<String> nomes){
        return  nomes == null ? List.of() : nomes.stream()
                .map(nome -> bancoDeDadosRepository.findByNome(nome)
                        .orElseGet(()->{
                            BancoDeDados novo = new BancoDeDados();
                            novo.setNome(nome);
                            return novo;
                        }))
                .toList();
    }

}
