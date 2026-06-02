import pandas as pd
import joblib

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

ARQUIVO_MODELO = BASE_DIR / "content" / "modelo_viagens.pkl"
ARQUIVO_COLUNAS = BASE_DIR / "content" / "colunas_modelo.pkl"

class PredictedModel:
    def __init__(self):
        self.modelo = joblib.load(ARQUIVO_MODELO)
        self.colunas = joblib.load(ARQUIVO_COLUNAS)

    def preparar_entrada(self, dados):

        df = pd.DataFrame([dados])

        df = pd.get_dummies(
            df,
            columns=["Destino"]
        )

        for coluna in self.colunas:
            if coluna not in df.columns:
                df[coluna] = 0

        df = df[self.colunas]

        return df

    def prever(self, dados):
        df = self.preparar_entrada(dados)
        previsao = self.modelo.predict(df)
        return round(float(previsao[0]), 2)