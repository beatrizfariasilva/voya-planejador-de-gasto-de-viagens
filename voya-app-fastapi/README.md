# 🤖 Voya IA Service

Serviço de Inteligência Artificial da plataforma **Voya**, responsável por realizar previsões de custos de viagens utilizando técnicas de Machine Learning.
Desenvolvido com **Python** e **FastAPI**, este módulo recebe dados enviados pelo backend, processa as informações e retorna estimativas de custos baseadas em um modelo treinado com dados históricos.

## Funcionalidades

### Processamento de Dados

* Recebimento dos dados enviados pelo backend
* Tratamento e preparação das informações
* Conversão dos dados para o formato esperado pelo modelo

### Machine Learning

* Utilização de algoritmo de regressão para previsão de custos
* Processamento de múltiplas variáveis relacionadas à viagem

### Integração com Backend

* Recebimento de requisições via API REST
* Retorno das previsões para o backend Spring Boot
* Comunicação entre serviços

## Tecnologias Utilizadas

* Python
* FastAPI
* Scikit-Learn
* Uvicorn

## Estrutura do Projeto

```text
voya-app-fastapi/
│
├── content/                    # Modelo treinado e arquivos CSV utilizados no treinamento
│
├── models/                     # Classes Pydantic para validação
│
├── predict_model/
│   ├── predict_model.py        # Preparação e processamento dos dados para predição
│   └── treinamento.py          # Treinamento do modelo de Machine Learning
│
├── app.py                      # Inicialização da API FastAPI
├── requirements.txt            # Dependências do projeto
└── README.md
```

## Execução do Projeto

### Criar Ambiente Virtual

```bash
python -m venv .venv
```

### Ativar Ambiente Virtual

**Windows**

```bash
.venv\Scripts\activate
```

**Linux/macOS**

```bash
source .venv/bin/activate
```

### Instalar Dependências

```bash
pip install -r requirements.txt
```

### Executar Aplicação

```bash
uvicorn main:app --reload
```

## Contexto Acadêmico

Este módulo foi desenvolvido para aplicação prática de conceitos relacionados a:

* Python
* FastAPI
* Machine Learning
* APIs REST
* Inteligência Artificial

