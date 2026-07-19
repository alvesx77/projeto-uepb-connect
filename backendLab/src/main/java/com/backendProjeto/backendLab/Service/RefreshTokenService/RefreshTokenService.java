package com.backendProjeto.backendLab.Service.RefreshTokenService;

import com.backendProjeto.backendLab.Model.Usuarios.RefreshToken;
import com.backendProjeto.backendLab.Model.Usuarios.Usuarios;
import com.backendProjeto.backendLab.Repository.RefreshTokenRepository;
import lombok.Lombok;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public String gerarSalvar(Usuarios usuarios){
        String rawToken = UUID.randomUUID().toString() + UUID.randomUUID();
        String tokenHash = hash(rawToken);

        RefreshToken entity = new RefreshToken();

        entity.setTokenHash(tokenHash);
        entity.setUsuarios(usuarios);
        entity.setCriadoEm(Instant.now());
        entity.setExpiraEm(Instant.now().plus(7, ChronoUnit.DAYS));

        refreshTokenRepository.save(entity);

        return rawToken;
    }

    public Optional<RefreshToken> validar(String rawToken){
        String tokenHash = hash(rawToken);
        return refreshTokenRepository.findByTokenHash(tokenHash)
                .filter(t -> t.getRevogadoEm() == null)
                .filter(t -> t.getExpiraEm().isAfter(Instant.now()));
    }

    public void revogar(String rawToken){
        String tokenHash = hash(rawToken);
        refreshTokenRepository.findByTokenHash(tokenHash)
                .ifPresent(t ->
                {
                    t.setRevogadoEm(Instant.now());
                    refreshTokenRepository.save(t);
                });
    }

    private String hash(String value){
        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] bytes = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(bytes);
        }
        catch (NoSuchAlgorithmException erro){
            throw new RuntimeException("erro no gerador de hash"+erro.getMessage(),erro);
        }
    }
}
