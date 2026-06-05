import pandas as pd
import joblib

from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

BASE_DIR = Path(__file__).resolve().parent.parent

ARQUIVO_CSV = BASE_DIR / "content" / "bancodedados.csv"
ARQUIVO_MODELO = BASE_DIR / "content" / "modelo_viagens.pkl"

def carregar_dados():

    dados = pd.read_csv(ARQUIVO_CSV)
    y=dados["custoEstimado"]
    X=dados.drop(["destino", "custoEstimado"], axis=1)

    return X, y

def main():
    X, y = carregar_dados()

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42
    )

    modelo=RandomForestRegressor(
    n_estimators=200,
    random_state=42
    )

    modelo.fit(X_train, y_train)
    y_pred = modelo.predict(X_test)

    joblib.dump(modelo, ARQUIVO_MODELO)

if __name__ == "__main__":
    main()