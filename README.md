## Equipe

Projeto desenvolvido por:

- Andressa Karine de Lima Amorim Miranda
- Beatriz Farias Silva

# Voya

Voya é uma plataforma inteligente de planejamento de viagens que utiliza um algoritmo de regressão para prever custos de viagem com base em dados previamente treinados e em informações fornecidas pelos usuários, permitindo gerar estimativas de gastos que auxiliam no planejamento financeiro de futuras viagens.

**Autoras**
- Andressa Karine de Lima Amorim Miranda
- Beatriz Farias Silva

# Arquitetura

                 ┌─────────────────┐
                 │    Frontend     │
                 │ React + Next.js │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │     Backend     │
                 │   Spring Boot   │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Serviço de IA   │
                 │     FastAPI     │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Modelo Preditivo│
                 │ Machine Learning│
                 └─────────────────┘

## Tecnologias Utilizadas

### Frontend
- Next.js
- React
- Javascript
- CSS

### Backend
- Spring Boot (Java)

### Inteligência Artificial e Machine Learning
- FastAPI
- Scikit-learn
  - RandomForestRegressor

### Banco de Dados
- PostgreSQL

## Estrutura do Projeto

```text
voya/
│
├── frontend/                 # Interface do usuário (React + Next.js)
│
├── voya-app/                 # Backend principal (Spring Boot)
│
├── voya-app-fastapi/         # Serviço de Machine Learning (FastAPI)
│   └── requirements.txt      # Dependências do Python
│
├── .gitignore
└── README.md
```

## Documentação dos Módulos

Cada componente do sistema possui sua própria documentação:

- **Frontend:** interface, componentes e experiência do usuário.
- **Backend:** APIs, autenticação e regras de negócio.
- **IA Service:** treinamento, processamento e previsões do modelo.