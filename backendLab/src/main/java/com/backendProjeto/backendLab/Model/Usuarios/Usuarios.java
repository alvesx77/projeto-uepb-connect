package com.backendProjeto.backendLab.Model.Usuarios;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name = "usuarios")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Usuarios implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String nomeCompleto;

    @Column(unique = true,nullable = false)
    @Email(message = "email invalido")
    private String emailInstitucional;


    @Column(unique = true,nullable = false)
    private String telefone;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private String curso;

    @Column(nullable = false)
    private String periodo;

    @Column(nullable = false,unique = true)
    private String matricula;

    @Column(columnDefinition = "TEXT",nullable = true)
    private String curriculo;

    @Column(nullable = true)
    private String linkGithub;

    @Column(nullable = true)
    private String linkLinkedin;

    @Column(nullable = true)
    private String linkPortifolio;

    @Column(nullable = false)
    private String situacaoEmpregabilidade;

    @Column(nullable = false)
    private String visibilidadePerfil;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_usuario")
    private TipoUsuario tipoUsuario;

    @ManyToMany(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @ToString.Exclude
    @JoinTable(
            name = "usuario_linguagem",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name ="linguagem_id")
    )
    private List<Linguagem> linguagens;

    @ManyToMany(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @ToString.Exclude
    @JoinTable(
            name = "usuario_framework",
            joinColumns = @JoinColumn(name = "usuario_id" ),
            inverseJoinColumns = @JoinColumn(name = "framework_id")
    )
    private List<Framework> frameworks;

    @ManyToMany(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @ToString.Exclude
    @JoinTable(
            name = "usuario_banco_dados",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "banco_dados_id")
    )
    private List<BancoDeDados> bancoDados;

    @ManyToMany(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @ToString.Exclude
    @JoinTable(
            name = "usuario_cloud",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "cloud_id")
    )
    private List<Clouds> cloud;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @ToString.Exclude
    @JoinTable(
            name = "usuario_area_afinidade",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "area_id")
    )
    private List<AreasAfinidades> areasAfinidade;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
       if (this.tipoUsuario == TipoUsuario.ADMIN){
           return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"),new SimpleGrantedAuthority("ROLE_ALUNO"));
       }
       else {
           return List.of(new SimpleGrantedAuthority("ROLE_ALUNO"));
       }
    }

    @Override
    public @Nullable String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return emailInstitucional;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
