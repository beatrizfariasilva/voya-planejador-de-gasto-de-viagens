from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
model = joblib.load('voya-api-flask/modelo.pkl')

@app.route('/prever', methods=['POST'])
def prever():
    try:
        dados_json = request.get_json()
        df = pd.DataFrame([dados_json])
        if 'destino' in df.columns:
            df = df.drop(['destino'], axis=1)
        predicao = model.predict(df)
        
        print(predicao)
        print(type(predicao))
        return jsonify({'previsao': float(predicao[0])})
    except Exception as e:
        return jsonify({'erro': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
