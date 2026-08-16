package com.backendProjeto.backendLab.Service.AtualizarDados;

import com.backendProjeto.backendLab.DTOS.InformacoesDashbord.InformacoesEditarPerfilDto;
import com.backendProjeto.backendLab.Erros.DadoDuplicadoException;
import com.backendProjeto.backendLab.Erros.ResourceNotFoundException;
import com.backendProjeto.backendLab.Model.Usuarios.*;
import com.backendProjeto.backendLab.Repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AtualizarDadosService {

    private final AreasAfinidadeRepository areasAfinidadeRepository;
    private final UsuarioRepository usuarioRepository;
    private final LinguagemRepository linguagemRepository;
    private final FramewokRepository framewokRepository;
    private final CloudRepository cloudRepository;
    private final BancoDeDadosRepository bancoDeDadosRepository;

    public AtualizarDadosService(LinguagemRepository linguagemRepository,
                                 AreasAfinidadeRepository areasAfinidadeRepository,
                                 UsuarioRepository usuarioRepository,
                                 FramewokRepository framewokRepository,
                                 CloudRepository cloudRepository,
                                 BancoDeDadosRepository bancoDeDadosRepository){
        this.areasAfinidadeRepository = areasAfinidadeRepository;
        this.usuarioRepository = usuarioRepository;
        this.linguagemRepository = linguagemRepository;
        this.framewokRepository = framewokRepository;
        this.cloudRepository = cloudRepository;
        this.bancoDeDadosRepository = bancoDeDadosRepository;
    }

    public Usuarios AtualizarUsuarios(Usuarios usuario,InformacoesEditarPerfilDto informacoesEditarPerfilDto){
        usuario.setNomeCompleto(informacoesEditarPerfilDto.getNomeCompleto());
        if (!usuario.getEmailInstitucional().equals(informacoesEditarPerfilDto.getEmailInstitucional())){
            verifcarEmailInstitucional(informacoesEditarPerfilDto.getEmailInstitucional());
            usuario.setEmailInstitucional(informacoesEditarPerfilDto.getEmailInstitucional());
        }
        if (!usuario.getTelefone().equals(informacoesEditarPerfilDto.getTelefone())){
            verificarTelefone(informacoesEditarPerfilDto.getTelefone());
            usuario.setTelefone(informacoesEditarPerfilDto.getTelefone());
        }
        usuario.setCurso(informacoesEditarPerfilDto.getCurso());
        usuario.setPeriodo(informacoesEditarPerfilDto.getPeriodo());
        if (!usuario.getMatricula().equals(informacoesEditarPerfilDto.getMatricula())){
            verificarMatricula(informacoesEditarPerfilDto.getMatricula());
            usuario.setMatricula(informacoesEditarPerfilDto.getMatricula());
        }
        usuario.setCurriculo(informacoesEditarPerfilDto.getCurriculo());
        usuario.setVisibilidadePerfil(informacoesEditarPerfilDto.getVisibilidadePerfil());
        usuario.setLinkLinkedin(informacoesEditarPerfilDto.getLinkLinkedin());
        usuario.setLinkGithub(informacoesEditarPerfilDto.getLinkGithub());
        usuario.setLinkPortifolio(informacoesEditarPerfilDto.getLinkPortifolio());
        usuario.setSituacaoEmpregabilidade(informacoesEditarPerfilDto.getSituacaoEmpregabilidade());
        usuario.setUpdatedAt(LocalDateTime.now());
        atualizarAreasAfinidades(usuario,informacoesEditarPerfilDto);
        atualizarLinguagens(usuario,informacoesEditarPerfilDto);
        atualizarFrameworks(usuario,informacoesEditarPerfilDto);
        atualizarClouds(usuario,informacoesEditarPerfilDto);
        atualizarBancoDados(usuario,informacoesEditarPerfilDto);

        return usuarioRepository.save(usuario);
    }

    private void verifcarEmailInstitucional(String emailInstitucional){
        if (usuarioRepository.existsByEmailInstitucional(emailInstitucional)){
            throw new DadoDuplicadoException("ja existe um usuario com esse email");
        }
    }

    private void verificarTelefone(String telefone){
        if (usuarioRepository.existsByTelefone(telefone)){
            throw new DadoDuplicadoException("ja existe um usuario com esse telefone");
        }
    }

    private void verificarMatricula(String matricula){
        if (usuarioRepository.existsByMatricula(matricula))
            throw new DadoDuplicadoException("ja existe um usuario com essa matricula");
    }

    private void atualizarAreasAfinidades(Usuarios usuario,InformacoesEditarPerfilDto informacoesEditarPerfilDto){
        List<AreasAfinidades> areasAfinidades = informacoesEditarPerfilDto.getAreasAfinidade().stream()
                .map(nome -> areasAfinidadeRepository.findByNome(nome)
                        .orElseThrow(() -> new ResourceNotFoundException("areas de afinidades não encontradas"+nome)))
                .toList();
        usuario.setAreasAfinidade(areasAfinidades);
    }

    private void atualizarLinguagens(Usuarios usuario,InformacoesEditarPerfilDto informacoesEditarPerfilDto){
        List<Linguagem> linguagens = informacoesEditarPerfilDto.getLinguagens().stream()
                .map(nome -> linguagemRepository.findByNome(nome)
                        .orElseThrow(() -> new ResourceNotFoundException("linguagem nao encontrada"+nome)))
                .toList();
        usuario.setLinguagens(linguagens);
    }

    private void atualizarFrameworks(Usuarios usuario,InformacoesEditarPerfilDto informacoesEditarPerfilDto){
        List<Framework> frameworks = informacoesEditarPerfilDto.getFrameworks().stream()
                .map(nome -> framewokRepository.findByNome(nome)
                        .orElseThrow(() -> new ResourceNotFoundException("framework nao encontrada"+nome)))
                .toList();
        usuario.setFrameworks(frameworks);
    }

    private void atualizarClouds(Usuarios usuario,InformacoesEditarPerfilDto informacoesEditarPerfilDto){
        List<Clouds> cloud = informacoesEditarPerfilDto.getCloud().stream()
                .map(nome -> cloudRepository.findByNome(nome)
                        .orElseThrow(() -> new ResourceNotFoundException("cloud nao encotrado"+nome)))
                .toList();
        usuario.setCloud(cloud);
    }

    private void atualizarBancoDados(Usuarios usuario,InformacoesEditarPerfilDto informacoesEditarPerfilDto){
        List<BancoDeDados> bancoDeDados = informacoesEditarPerfilDto.getBancoDados().stream()
                .map(nome -> bancoDeDadosRepository.findByNome(nome)
                        .orElseThrow(() -> new ResourceNotFoundException("banco de dados nao encontrado"+ nome)))
                .toList();
        usuario.setBancoDados(bancoDeDados);
    }

}
