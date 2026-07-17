# Sobre o Projeto

O **UEPB Connect** é uma plataforma web desenvolvida para a **Universidade Estadual da Paraíba (UEPB)** com o objetivo de centralizar informações acadêmicas, profissionais e de interesse dos estudantes em um único ambiente. O sistema foi criado para facilitar a identificação de alunos com perfil adequado para oportunidades como estágios, empregos, projetos de extensão e outras atividades acadêmicas.

Atualmente, muitas dessas informações encontram-se dispersas ou são obtidas de maneira informal, o que torna o processo de busca por candidatos lento, pouco organizado e dependente de consultas individuais. Como consequência, o coordenador do curso enfrenta dificuldades para localizar rapidamente estudantes que atendam aos requisitos de uma determinada oportunidade.

Para solucionar esse problema, o UEPB Connect permite que cada aluno mantenha um perfil atualizado com suas competências técnicas, áreas de interesse, disponibilidade de horário, modalidade de trabalho desejada e tipos de oportunidades de interesse. Essas informações ficam centralizadas em uma única plataforma, possibilitando ao coordenador realizar pesquisas e aplicar filtros para encontrar rapidamente estudantes compatíveis com critérios específicos.

Desenvolvido com uma arquitetura baseada em **Spring Boot**, **API REST**, **MySQL** e um frontend web, o projeto prioriza organização, escalabilidade e facilidade de manutenção, permitindo futuras expansões e adaptações para outras instituições de ensino.

## Objetivo

O **UEPB Connect** tem como objetivo centralizar as informações acadêmicas e profissionais dos alunos da UEPB em uma única plataforma, facilitando o acesso e o gerenciamento desses dados.

Com as informações organizadas e sempre atualizadas, o coordenador do curso pode identificar rapidamente estudantes com perfil compatível para oportunidades como estágios, empregos, projetos de extensão e outras atividades acadêmicas, tornando o processo de indicação mais ágil, preciso e eficiente.

## Funcionalidades

###  Aluno

* Cadastro de conta.
* Login e autenticação.
* Recuperação de senha.
* Edição e atualização do perfil.
* Cadastro de competências técnicas.
* Definição de áreas de interesse.
* Configuração da disponibilidade de horário.
* Escolha da modalidade de trabalho (Presencial, Remoto ou Híbrido).
* Seleção dos tipos de oportunidades de interesse (estágio, emprego, projetos de extensão, entre outros).

###  Coordenador

* Visualização dos perfis dos alunos.
* Pesquisa por nome, matrícula e curso.
* Filtros por competências técnicas.
* Filtros por áreas de interesse.
* Filtros por disponibilidade e modalidade de trabalho.
* Combinação de múltiplos filtros.
* Ordenação dos resultados de pesquisa.
* Identificação rápida de alunos compatíveis com oportunidades.

### Sistema

* Controle de acesso por perfil (Aluno e Coordenador).
* Autenticação segura de usuários.
* Gerenciamento centralizado das informações dos estudantes.
* Comunicação entre frontend e backend por meio de API REST.

## Usuários do Sistema

O **UEPB Connect** possui dois perfis de usuários, cada um com funcionalidades específicas.

### Aluno

Responsável por cadastrar e manter seu perfil atualizado, informando dados pessoais, competências técnicas, áreas de interesse, disponibilidade de horário, modalidade de trabalho e oportunidades de interesse.

### Coordenador

Responsável por consultar e gerenciar as informações dos alunos, utilizando pesquisas e filtros para identificar rapidamente estudantes compatíveis com oportunidades acadêmicas e profissionais.

## Arquitetura de Pastas

O backend do **UEPB Connect** foi desenvolvido utilizando **Java** e **Spring Boot**, seguindo uma arquitetura em camadas (Controller → Service → Repository → Model), separando as responsabilidades da aplicação e facilitando sua manutenção, escalabilidade e organização.

```text
backendLab/
├── src/
│   ├── main/
│   │   ├── java/com/backendProjeto/backendLab/
│   │   │   ├── Controller/
│   │   │   ├── DTOS/
│   │   │   ├── Erros/
│   │   │   ├── Model/
│   │   │   ├── Repository/
│   │   │   ├── Security/
│   │   │   ├── Service/
│   │   │   └── BackendLabApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

### 📁 `Controller`

Contém os controladores responsáveis por receber as requisições HTTP, validar os dados de entrada e encaminhá-las para a camada de serviços.

### 📁 `Service`

Implementa as regras de negócio da aplicação, realizando o processamento das informações antes de acessar o banco de dados ou retornar respostas ao cliente.

### 📁 `Repository`

Reúne as interfaces responsáveis pela comunicação com o banco de dados utilizando o Spring Data JPA, realizando operações de persistência e consulta.

### 📁 `Model`

Armazena as entidades que representam as tabelas do banco de dados, bem como seus atributos e relacionamentos.

### 📁 `DTOS`

Contém os **Data Transfer Objects (DTOs)** utilizados para transportar dados entre cliente e servidor, evitando a exposição direta das entidades da aplicação.

### 📁 `Security`

Responsável pela configuração da segurança da aplicação, incluindo autenticação, autorização e controle de acesso aos endpoints.

### 📁 `Erros`

Centraliza as exceções personalizadas e os manipuladores globais de erros, garantindo respostas padronizadas para situações de falha.

### 📁 `resources`

Armazena os arquivos de configuração da aplicação, como o `application.properties`, responsável pelas configurações do banco de dados e do Spring Boot.

### 📁 `test`

Contém os testes automatizados da aplicação, utilizados para validar o funcionamento dos componentes do sistema.

### 📄 `pom.xml`

Arquivo de configuração do Maven, responsável pelo gerenciamento das dependências, plugins e processo de build do projeto.

