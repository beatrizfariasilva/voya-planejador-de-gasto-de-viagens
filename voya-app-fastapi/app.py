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

@app.post("/predict")
def predict(dados: ViagemRequest):
    previsao = modelo.prever(dados.model_dump())
    if dados.Destino not in modelo.destinos_validos:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Destino não suportado.",
                "destinos_disponiveis": modelo.destinos_validos
            }
        )

    return {
        "success": True,
        "Valor Previsto": previsao
    }