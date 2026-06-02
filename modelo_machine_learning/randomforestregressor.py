import pandas as pd
import joblib
import matplotlib.pyplot as plt

from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (r2_score, mean_absolute_error,mean_squared_error)

BASE_DIR = Path(__file__).resolve().parent.parent

ARQUIVO_CSV = BASE_DIR / "content" / "dataset_ficticio.csv"

ARQUIVO_MODELO = BASE_DIR / "content" / "modelo_viagens.pkl"
ARQUIVO_COLUNAS = BASE_DIR / "content" / "colunas_modelo.pkl"

def carregar_dados(csv):

    dados = pd.read_csv(csv)

    dados = pd.get_dummies(
        dados,
        columns=["Destino"],
        drop_first=True
    )

    X = dados.drop("CustoReal", axis=1)
    y = dados["CustoReal"]

    return X, y

def treinar_modelo(X_train, y_train):

    modelo = RandomForestRegressor(
        n_estimators=200,
        random_state=42,
        n_jobs=-1
    )

    modelo.fit(X_train, y_train)

    return modelo

def avaliar_modelo(modelo, X_test, y_test):

    y_pred = modelo.predict(X_test)

    r2 = r2_score(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = mean_squared_error(y_test, y_pred) ** 0.5

    print(f"R²   : {r2:.4f}")
    print(f"MAE  : R$ {mae:,.2f}")
    print(f"RMSE : R$ {rmse:,.2f}")

    return y_pred

def gerar_grafico(y_test, y_pred):

    plt.figure(figsize=(8, 6))

    plt.scatter(y_test, y_pred)

    plt.plot(
        [y_test.min(), y_test.max()],
        [y_test.min(), y_test.max()],
        "r--"
    )

    plt.xlabel("Valor Real")
    plt.ylabel("Valor Previsto")
    plt.title("Random Forest - Valor Real x Previsto")

    plt.show()


def salvar_modelo(modelo, colunas):

    joblib.dump(modelo, ARQUIVO_MODELO)
    joblib.dump(list(colunas), ARQUIVO_COLUNAS)

    print(f"Modelo  : {ARQUIVO_MODELO}")
    print(f"Colunas : {ARQUIVO_COLUNAS}")

def main():

    print("Carregando dados...")

    X, y = carregar_dados(ARQUIVO_CSV)

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42
    )

    print("Treinando modelo...")

    modelo = treinar_modelo(X_train, y_train)

    y_pred = avaliar_modelo(modelo, X_test, y_test)

    gerar_grafico( y_test,y_pred)

    salvar_modelo(modelo,X.columns)


if __name__ == "__main__":
    main()