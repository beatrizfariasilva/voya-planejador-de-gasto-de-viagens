from fastapi import FastAPI, HTTPException
from models.message_request import ViagemRequest
from predicted_model.predicted_model import PredictedModel

app = FastAPI(
    title="Voya API",
    version="1.0.0"
)

modelo = PredictedModel()

@app.get("/")
def home():
    return {"Teste API": "Funcionando"}


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": True
    }

@app.post("/prever")
def prever(dados: ViagemRequest):
    try:
        predicao = modelo.prever(dados.model_dump())
        return ({"previsao" : predicao})
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
