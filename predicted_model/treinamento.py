import pandas as pd
import joblib

from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (r2_score,mean_absolute_error,mean_squared_error)

BASE_DIR = Path(__file__).resolve().parent.parent

ARQUIVO_CSV = BASE_DIR / "content" / "dataset_ficticio.csv"

ARQUIVO_MODELO = BASE_DIR / "content" / "modelo_viagens.pkl"
ARQUIVO_COLUNAS = BASE_DIR / "content" / "colunas_modelo.pkl"

def carregar_dados():

    dados = pd.read_csv(ARQUIVO_CSV)

    dados = pd.get_dummies(
        dados,
        columns=["Destino"],
        drop_first=True
    )

    X = dados.drop("CustoReal", axis=1)
    y = dados["CustoReal"]

    return X, y

def main():

    print("Carregando dados...")
    X, y = carregar_dados()

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42
    )

    print("Treinando modelo...")
    modelo = RandomForestRegressor(
        n_estimators=200,
        random_state=42,
        n_jobs=-1
    )

    modelo.fit(X_train, y_train)

    y_pred = modelo.predict(X_test)

    r2 = r2_score(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = mean_squared_error(y_test, y_pred) ** 0.5

    print(f"R²   : {r2:.4f}")
    print(f"MAE  : R$ {mae:,.2f}")
    print(f"RMSE : R$ {rmse:,.2f}")

    joblib.dump(modelo, ARQUIVO_MODELO)
    joblib.dump(list(X.columns), ARQUIVO_COLUNAS)

    print("\nModelo salvo com sucesso.")

if __name__ == "__main__":
    main()