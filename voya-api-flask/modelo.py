import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
import joblib

dados=pd.read_csv('voya-api-flask/bancodedados.csv')
y=dados["custoEstimado"]
X=dados.drop(["destino", "custoEstimado"], axis=1)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

modelo = DecisionTreeRegressor(
    max_depth=5,
    random_state=42
)

modelo.fit(X_train, y_train)

y_pred = modelo.predict(X_test)

modelo=RandomForestRegressor(
    n_estimators=200,
    random_state=42
)

modelo.fit(X_train, y_train)
y_pred = modelo.predict(X_test)

joblib.dump(modelo, 'voya-api-flask/modelo.pkl')