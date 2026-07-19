package com.backendProjeto.backendLab.Service.Cadastro;

import com.backendProjeto.backendLab.DTOS.Cadastro.UsuarioDto;
import com.backendProjeto.backendLab.Erros.DadoDuplicadoException;
import com.backendProjeto.backendLab.Model.Usuarios.*;
import com.backendProjeto.backendLab.Repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CadastroService {
    private final UsuarioRepository usuarioRepository;
    private final LinguagemRepository linguagemRepository;
    private final FramewokRepository framewokRepository;
    private final BancoDeDadosRepository bancoDeDadosRepository;
    private final CloudRepository cloudRepository;
    private final AreasAfinidadeRepository areasAfinidadeRepository;
    private final PasswordEncoder passwordEncoder;

    public CadastroService(UsuarioRepository usuarioRepository,
                           LinguagemRepository linguagemRepository,
                           FramewokRepository framewokRepository,
                           BancoDeDadosRepository bancoDeDadosRepository,
                           CloudRepository cloudRepository,
                           AreasAfinidadeRepository areasAfinidadeRepository,
                           PasswordEncoder passwordEncoder)
    {
        this.usuarioRepository = usuarioRepository;
        this.linguagemRepository = linguagemRepository;
        this.framewokRepository = framewokRepository;
        this.bancoDeDadosRepository = bancoDeDadosRepository;
        this.cloudRepository = cloudRepository;
        this.areasAfinidadeRepository = areasAfinidadeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuarios saveUsuarios(UsuarioDto usuarioDto){

        verifcarEmailInstitucional(usuarioDto.getEmailInstitucional());
        verificarTelefone(usuarioDto.getTelefone());
        verificarMatricula(usuarioDto.getMatricula());

        Usuarios usuario = new Usuarios();
        usuario.setNomeCompleto(usuarioDto.getNomeCompleto());
        usuario.setEmailInstitucional(usuarioDto.getEmailInstitucional());
        usuario.setTelefone(usuarioDto.getTelefone());
        usuario.setSenha(passwordEncoder.encode(usuarioDto.getSenha()));
        usuario.setCurso(usuarioDto.getCurso());
        usuario.setPeriodo(usuarioDto.getPeriodo());
        usuario.setMatricula(usuarioDto.getMatricula());
        usuario.setCurriculo(usuarioDto.getCurriculo());
        usuario.setLinkGithub(usuarioDto.getLinkGithub());
        usuario.setLinkLinkedin(usuarioDto.getLinkLinkedin());
        usuario.setLinkPortifolio(usuarioDto.getLinkPortifolio());
        usuario.setSituacaoEmpregabilidade(usuarioDto.getSituacaoEmpregabilidade());
        usuario.setVisibilidadePerfil(usuarioDto.getVisibilidadePerfil());
        usuario.setTipoUsuario(usuarioDto.getTipoUsuario() != null ? usuarioDto.getTipoUsuario(): "ALUNO");

        usuario.setLinguagens(resolverLinguagens(usuarioDto.getLinguagens()));
        usuario.setFrameworks(resolverFrameworks(usuarioDto.getFrameworks()));
        usuario.setBancoDados(resolverBancoDados(usuarioDto.getBancoDados()));
        usuario.setCloud(resolverCloud(usuarioDto.getCloud()));
        usuario.setAreasAfinidade(resolverAreasAfinidade(usuarioDto.getAreasAfinidade()));

        return usuarioRepository.save(usuario);
    }

    public void verifcarEmailInstitucional(String emailInstitucional){
        if (usuarioRepository.existsByEmailInstitucional(emailInstitucional)){
            throw new DadoDuplicadoException("ja existe um usuario com esse email");
        }
    }

    public void verificarTelefone(String telefone){
        if (usuarioRepository.existsByTelefone(telefone)){
            throw new DadoDuplicadoException("ja existe um usuario com esse telefone");
        }
    }

    public void verificarMatricula(String matricula){
        if (usuarioRepository.existsByMatricula(matricula))
            throw new DadoDuplicadoException("ja existe um usuario com essa matricula");
    }

    private List<Linguagem> resolverLinguagens(List<String> nomes) {
        return nomes == null ? List.of() : nomes.stream()
                .map(nome -> linguagemRepository.findByNome(nome)
                        .orElseGet(() -> {
                            Linguagem nova = new Linguagem();
                            nova.setNome(nome);
                            return nova;
                        }))
                .toList();
    }

    private List<Framework> resolverFrameworks(List<String> nomes) {
        return nomes == null ? List.of() : nomes.stream()
                .map(nome -> framewokRepository.findByNome(nome)
                        .orElseGet(() -> {
                            Framework novo = new Framework();
                            novo.setNome(nome);
                            return novo;
                        }))
                .toList();
    }

    private List<BancoDeDados> resolverBancoDados(List<String> nomes) {
        return nomes == null ? List.of() : nomes.stream()
                .map(nome -> bancoDeDadosRepository.findByNome(nome)
                        .orElseGet(() -> {
                            BancoDeDados novo = new BancoDeDados();
                            novo.setNome(nome);
                            return novo;
                        }))
                .toList();
    }

    private List<Clouds> resolverCloud(List<String> nomes) {
        return nomes == null ? List.of() : nomes.stream()
                .map(nome -> cloudRepository.findByNome(nome)
                        .orElseGet(() -> {
                            Clouds nova = new Clouds();
                            nova.setNome(nome);
                            return nova;
                        }))
                .toList();
    }

    private List<AreasAfinidades> resolverAreasAfinidade(List<String> nomes) {
        return nomes == null ? List.of() : nomes.stream()
                .map(nome -> areasAfinidadeRepository.findByNome(nome)
                        .orElseGet(() -> {
                            AreasAfinidades nova = new AreasAfinidades();
                            nova.setNome(nome);
                            return nova;
                        }))
                .toList();
    }
}