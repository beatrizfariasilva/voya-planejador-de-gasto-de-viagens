"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { recuperarSenha, validarEmail } from "../../services/recuperarSenhaService";
import "../Login/Login.css";
import Avioes from "../../components/Avioes/Avioes";

function RecuperarSenha() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [emailValidado, setEmailValidado] = useState(false);

  async function handleValidarEmail() {
    try {
      await validarEmail(email);

      setEmailValidado(true);

      alert("E-mail encontrado!");

    } catch (error) {
      alert(error.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await recuperarSenha(email, novaSenha);

      alert("Senha alterada com sucesso!");

      router.push("/login");

    } catch (error) {
      alert(error.message);
    }
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
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                disabled={emailValidado}
              />
            </div>

            {!emailValidado ? (
              <button
                type="button"
                onClick={handleValidarEmail}
              >
                Verificar e-mail
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

                <button type="submit">
                  Alterar senha
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