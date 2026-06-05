import pandas as pd
import joblib

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

ARQUIVO_MODELO = BASE_DIR / "content" / "modelo_viagens.pkl"

class PredictedModel:
    def __init__(self):
        self.modelo = joblib.load(ARQUIVO_MODELO)
        print(self.modelo.feature_names_in_)

    def preparar_entrada(self, dados):

        df = pd.DataFrame([dados])

        if "destino" in df.columns:
            df = df.drop(columns=["destino"])

        df = df[
            [
                "dias",
                "pessoas",
                "hospedagem",
                "passeios",
                "vidaNoturna",
                "alimentacao",
            ]
        ]
        return df

    def prever(self, dados):
        df = self.preparar_entrada(dados)
        previsao = self.modelo.predict(df)
        return round(float(previsao[0]), 2)