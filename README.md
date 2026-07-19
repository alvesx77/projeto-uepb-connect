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

    
## Arquitetura Utilizada

O **UEPB Connect** foi desenvolvido utilizando a **Arquitetura em Camadas (Layered Architecture)**, um padrão amplamente adotado em aplicações desenvolvidas com Spring Boot. Essa arquitetura organiza o sistema em camadas independentes, onde cada uma possui uma responsabilidade específica, promovendo maior organização, manutenção e escalabilidade.

O projeto é composto por um **frontend** e um **backend** presentes no mesmo repositório. A comunicação entre essas camadas é realizada por meio de uma **API REST**, utilizando requisições e respostas no formato **JSON**. A persistência dos dados é realizada em um banco de dados **MySQL**, utilizando **Spring Data JPA (Hibernate)**.

### Fluxo da Aplicação

O processamento de uma requisição segue o fluxo abaixo:

```text
Cliente (Frontend)
        │
        ▼
 Controller
        │
        ▼
   Service
        │
        ▼
 Repository
        │
        ▼
 Banco de Dados (MySQL)
```

### Organização das Camadas

| Camada         | Responsabilidade                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| **Controller** | Recebe as requisições HTTP, valida os dados de entrada e encaminha as operações para a camada de serviço.       |
| **Service**    | Implementa as regras de negócio da aplicação e coordena o processamento das informações.                        |
| **Repository** | Realiza a comunicação com o banco de dados utilizando Spring Data JPA (Hibernate).                              |
| **Model**      | Representa as entidades da aplicação e seus relacionamentos com o banco de dados.                               |
| **DTO**        | Responsável pela transferência de dados entre cliente e servidor, evitando a exposição direta das entidades.    |
| **Security**   | Configura o processo de autenticação, controle de acesso e gerenciamento de sessões utilizando Spring Security. |

## Tecnologias Utilizadas

O **UEPB Connect** foi desenvolvido utilizando tecnologias amplamente empregadas no desenvolvimento de aplicações web, garantindo organização, desempenho e facilidade de manutenção.

| Categoria                     | Tecnologia                  | Finalidade                                                                                       |
| ----------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------ |
| **Backend**                   | Java                        | Linguagem utilizada para implementar as regras de negócio da aplicação.                          |
| **Framework Backend**         | Spring Boot                 | Desenvolvimento da API REST, gerenciamento de dependências e estrutura da aplicação.             |
| **Frontend**                  | HTML5                       | Estruturação das páginas da aplicação.                                                           |
| **Frontend**                  | CSS3                        | Estilização e responsividade da interface.                                                       |
| **Frontend**                  | JavaScript                  | Implementação da interatividade e comunicação com a API.                                         |
| **Banco de Dados**            | MySQL                       | Armazenamento persistente das informações da aplicação.                                          |
| **Persistência**              | Spring Data JPA (Hibernate) | Comunicação entre a aplicação e o banco de dados por meio do mapeamento objeto-relacional (ORM). |
| **Segurança**                 | Spring Security             | Autenticação de usuários e controle de acesso à aplicação.                                       |
| **Controle de Versão**        | Git                         | Gerenciamento do histórico de desenvolvimento do projeto.                                        |
| **Hospedagem do Repositório** | GitHub                      | Versionamento, colaboração e armazenamento do código-fonte.                                      |


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

## Pré-requisitos

Antes de executar o **UEPB Connect**, certifique-se de que os seguintes requisitos estejam instalados e configurados em sua máquina:

| Requisito | Versão                                            |
| --------- | ------------------------------------------------- |
| Java      | 25 ou superior                                    |
| Maven     | Compatível com o projeto                          |
| MySQL     | 8.0                                               |
| Git       | Versão mais recente                               |
| IDE       | IntelliJ IDEA ou Visual Studio Code (recomendado) |

### Configurações Necessárias

Antes de iniciar a aplicação, é necessário:

* Clonar o repositório do projeto.
* Importar o banco de dados disponível no repositório para o MySQL.
* Configurar as credenciais de acesso ao banco de dados no arquivo `application.properties` (URL, usuário e senha).
* Executar o projeto utilizando o Maven ou diretamente pela IDE.

> **Observação:** O frontend é servido pela própria aplicação Spring Boot, não sendo necessária nenhuma configuração adicional ou instalação de ferramentas como Node.js ou npm.

## Como Executar o Projeto

Siga os passos abaixo para executar o **UEPB Connect** em sua máquina.

### 1️⃣ Clonar o Repositório

Clone o projeto utilizando o Git:

```bash
git clone https://github.com/alvesx77/projeto-uepb-connect.git
```

Em seguida, acesse a pasta do projeto:

```bash
cd projeto-uepb-connect
```

---

### 2️⃣ Importar o Banco de Dados

1. Abra o **MySQL Workbench** (ou outro cliente MySQL de sua preferência).
2. Crie um banco de dados (caso necessário).
3. Importe o arquivo `.sql` disponibilizado no repositório.
4. Verifique se todas as tabelas foram criadas corretamente.

---

### 3️⃣ Configurar o Banco de Dados

Abra o arquivo:

```text
src/main/resources/application.properties
```

Configure as credenciais de acesso ao MySQL de acordo com sua máquina:

```properties
spring.datasource.url = jdbc:mysql://localhost:3306/testebanco 
spring.datasource.username = SEU_USUARIO
spring.datasource.password = SUA_SENHA
```

---

### 4️⃣ Executar o Backend

Abra o projeto em uma IDE compatível, como **IntelliJ IDEA** ou **Visual Studio Code**, e execute a classe principal:

```text
BackendLabApplication.java
```

Ou utilize o Maven pelo terminal:

```bash
mvn spring-boot:run
```

Após a inicialização, o backend estará disponível em:

```text
http://localhost:8080
```

---

### 5️⃣ Acessar a Aplicação

O frontend é servido pela própria aplicação **Spring Boot**. Após iniciar o backend, basta acessar a aplicação pelo navegador utilizando o endereço configurado para o projeto (por padrão, `http://localhost:8080`).

---

### ✅ Pronto!

Com esses passos concluídos, o **UEPB Connect** estará em execução e pronto para utilização.

## Configuração do Banco de Dados

O **UEPB Connect** utiliza o **MySQL 8.0** como banco de dados. Para configurar a aplicação, siga os passos abaixo.

### 1️⃣ Criar o banco de dados

Crie um banco de dados com o nome:

```sql
CREATE DATABASE testebanco;
```

### 2️⃣ Importar o banco

Importe o arquivo do banco de dados disponibilizado no repositório para o banco `testebanco`.

### 3️⃣ Configurar as credenciais

Abra o arquivo:

```text
src/main/resources/application.properties
```

Altere apenas as credenciais de acesso ao MySQL de acordo com sua configuração local:

```properties
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
```

> **Observação:** O nome do banco de dados já está configurado como `testebanco`, portanto não é necessário alterá-lo.

## Equipe de Desenvolvimento

O **UEPB Connect** foi desenvolvido de forma colaborativa por uma equipe de quatro integrantes, que contribuíram conjuntamente para o desenvolvimento da aplicação.

<div align="center">

<table>
<tr>

<td align="center" width="25%">

<a href="https://github.com/murilo-xavier">
<img src="https://github.com/murilo-xavier.png" width="120px;" alt="Murilo Xavier"/>
</a>

### Murilo Xavier de Macedo

<a href="https://github.com/murilo-xavier">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="https://linkedin.com/in/murilo-xavier">
<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

muriloxmacedo@gmail.com

</td>

<td align="center" width="25%">

<a href="https://github.com/alvesx77">
<img src="https://github.com/alvesx77.png" width="120px;" alt="Nixon Alves"/>
</a>

### Nixon Alves de Melo Filho

<a href="https://github.com/alvesx77">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="https://linkedin.com/in/">
<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

📧 Nixon2@gmail.com

</td>

<td align="center" width="25%">

<a href="https://github.com/">
<img src="https://github.com/.png" width="120px;" alt="Italo"/>
</a>

### Italo

<a href="https://github.com/">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="https://linkedin.com/in/">
<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

📧 emailItalo@gmail.com

</td>

<td align="center" width="25%">

<a href="https://github.com/">
<img src="https://github.com/.png" width="120px;" alt="Laryssa Medeiros"/>
</a>

### Laryssa

<a href="https://github.com/">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="https://linkedin.com/in/">
<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

📧 emailLaryssa@gmail.com

</td>

</tr>
</table>

</div>
