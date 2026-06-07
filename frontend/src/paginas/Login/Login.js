"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../services/authService";
import "./Login.css";
import { useAuthStore } from "../../store/authStore";
import Avioes from "../../components/Avioes/Avioes";

function Login() {
  const router = useRouter();
  const loginStore = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await login(email, senha);
      
      loginStore(
        {
          id: data.id,
          nome: data.nome,
          email: data.email,
        },
        data.token
      );
      router.push("/dashboard");

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
              src="/logoCortada.png"
              alt="Voya"
            />
          </div>
          <h1>Bem-vindo de volta</h1>

          <p className="subtitle">
            Faça login para acessar sua conta
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
              />
            </div>

            <div className="form-group">
              <label>Senha</label>

              <input
                type="password"
                placeholder="********"
                value={senha}
                onChange={(e) =>
                  setSenha(e.target.value)
                }
                required
              />
            </div>

            <button type="submit">
              Entrar
            </button>
          </form>

          <div className="register-link">
            Não possui conta?{" "}
            <a href="/registro">
              Criar conta
            </a>
          </div>
          <div className="forgot-password">
            <a href="/recuperarsenha">
              Esqueceu sua senha?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;