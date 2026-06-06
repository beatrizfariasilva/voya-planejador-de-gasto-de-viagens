"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { recuperarSenha,validarEmail } from "../../services/recuperarSenhaService";
import "../Login/Login.css";

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
      <div
        className="login-sidebar"
        style={{
          backgroundImage: "url('praia.png')",
        }}
      >
        <div className="containte-logo">
          <img
            src="logo.png"
            alt="Voya"
            className="logo"
          />
        </div>

        <div className="sidebar-card">
          <h2>Explore o mundo</h2>
          <p>
            Planeje viagens incríveis com noção de custos.
          </p>
        </div>
      </div>

      <div className="login-content">
        <div className="login-card">
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