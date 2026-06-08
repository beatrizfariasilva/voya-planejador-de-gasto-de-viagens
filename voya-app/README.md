# ☕ Voya Backend

Backend da plataforma **Voya**, responsável pelo gerenciamento das regras de negócio, autenticação de usuários, persistência de dados e integração com o serviço de Inteligência Artificial.

Desenvolvido utilizando **Spring Boot**, o sistema disponibiliza APIs REST responsáveis por processar as solicitações da aplicação, gerenciar usuários e intermediar a comunicação com o serviço de Machine Learning.

## Objetivo

Fornecer uma camada robusta de serviços para:

* Gerenciar usuários e autenticação.
* Processar dados enviados pelo frontend.
* Persistir informações no banco de dados.
* Integrar o sistema ao serviço de Inteligência Artificial.
* Disponibilizar APIs REST para consumo da aplicação.

## Funcionalidades

### Gerenciamento de Usuários

* Cadastro de usuários
* Autenticação via JWT
* Recuperação de senha
* Atualização de perfil
* Controle de acesso

### Gestão de Predições

* Recebimento dos dados para predição
* Validação das informações enviadas
* Comunicação com o serviço de IA
* Armazenamento dos resultados gerados

### Histórico

* Consulta de predições realizadas
* Persistência de dados históricos
* Recuperação de informações para exibição no frontend

###  Integração com IA

* Comunicação com serviço FastAPI
* Envio dos dados para processamento
* Recebimento das previsões geradas pelo modelo de Machine Learning

## Principais Tecnologias Utilizadas

* Java
* Spring Boot
* PostgreSQL

## Arquitetura

```text
Frontend (Next.js)
        │
        ▼
Backend (Spring Boot)
        │
        ├── Autenticação
        ├── Regras de Negócio
        ├── Persistência de Dados
        │
        ▼
Serviço de IA (FastAPI)
```

---

## Estrutura do Projeto

```text
voya-app/
│
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/voya/
│   │           ├── controller/      # Endpoints REST
│   │           ├── service/         # Regras de negócio
│   │           ├── repository/      # Acesso ao banco de dados
│   │           ├── model/           # Entidades da aplicação
│   │           ├── dto/             # Objetos de transferência de dados
│   │           ├── config/          # Configurações da aplicação
│   │           ├── exceptions/      # Tratamento de exceções
│   │           └── VoyaApplication.java
│   │
│   └── test/
│
├── pom.xml
└── README.md
```

## Execução do Projeto

### Instalar Dependências

```bash
mvn clean install
```

### Executar em Desenvolvimento

```bash
mvn spring-boot:run
```

### Gerar Build

```bash
mvn clean package
```

### Executar Aplicação

```bash
java -jar target/voya-app.jar
```

## Contexto Acadêmico

Este módulo foi desenvolvido para aplicação prática de conceitos relacionados a:

* Java
* Spring Boot
* APIs REST
* Persistência de Dados
* Integração entre Serviços

