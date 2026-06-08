"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  recuperarSenha,
  validarEmail,
} from "../../services/recuperarSenhaService";
import "../Login/Login.css";
import Avioes from "../../components/Avioes/Avioes";
import { Alert } from "../../components/Alertas/Alertas";

function RecuperarSenha() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [emailValidado, setEmailValidado] = useState(false);

  const validarEmailMutation = useMutation({
    mutationFn: (email) => validarEmail(email),

    onSuccess: () => {
      setEmailValidado(true);

      Alert.success(
        "Conta encontrada!",
        "Tudo certo! Agora defina uma nova senha para acessar sua conta."
      );
    },

    onError: (error) => {
      Alert.error(error.message);
    },
  });

  const recuperarSenhaMutation = useMutation({
    mutationFn: ({ email, novaSenha }) =>
      recuperarSenha(email, novaSenha),

    onSuccess: () => {
      Alert.success(
        "Senha atualizada!",
        "Sua nova senha foi salva com sucesso. Faça login para continuar."
      );

      router.push("/login");
    },

    onError: (error) => {
      Alert.error(error.message);
    },
  });

  function handleValidarEmail() {
    validarEmailMutation.mutate(email);
  }

  function handleSubmit(e) {
    e.preventDefault();

    recuperarSenhaMutation.mutate({
      email,
      novaSenha,
    });
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <Avioes />
        <div className="login-card">
          <div className="login-logo">
            <img
              src="logoCortada.png"
              alt="Voya"
              className="logo"
            />
          </div>
          <h1>Recuperar senha</h1>

          <p className="subtitle">
            Informe seu e-mail para continuar.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>E-mail</label>

              <input
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={emailValidado}
              />
            </div>

            {!emailValidado ? (
              <button
                type="button"
                onClick={handleValidarEmail}
                disabled={validarEmailMutation.isPending}
              >
                {validarEmailMutation.isPending
                  ? "Verificando..."
                  : "Verificar e-mail"}
              </button>
            ) : (
              <>
                <div className="form-group">
                  <label>Nova senha</label>

                  <input
                    type="password"
                    placeholder="********"
                    value={novaSenha}
                    onChange={(e) =>
                      setNovaSenha(e.target.value)
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={recuperarSenhaMutation.isPending}
                >
                  {recuperarSenhaMutation.isPending
                    ? "Alterando..."
                    : "Alterar senha"}
                </button>
              </>
            )}
          </form>

          <div className="register-link">
            Lembrou sua senha?{" "}
            <a href="/login">
              Voltar para login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecuperarSenha;