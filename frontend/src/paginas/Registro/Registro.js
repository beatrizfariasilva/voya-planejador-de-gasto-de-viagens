"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { cadastrar } from "../../services/registroService";
import "../Login/Login.css";
import Avioes from "../../components/Avioes/Avioes";
import { Alert } from "../../components/Alertas/Alertas";

function Registro() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastroMutation = useMutation({
    mutationFn: (usuario) => cadastrar(usuario),

    onSuccess: (data) => {
      console.log("Usuário criado:", data);

      Alert.success(
        "Conta criada com sucesso!",
        "Agora você já pode acessar sua conta."
      );
      router.push("/login");
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    cadastroMutation.mutate({
      nome,
      email,
      senha,
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
          <h1>Criar conta</h1>

          <p className="subtitle">
            Cadastre-se para começar a planejar suas viagens.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome completo</label>

              <input
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>E-mail</label>

              <input
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Senha</label>

              <input
                type="password"
                placeholder="********"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={cadastroMutation.isPending}
            >
              {cadastroMutation.isPending
                ? "Criando..."
                : "Criar conta"}
            </button>
          </form>

          <div className="register-link">
            Já possui conta?{" "}
            <a href="/login">
              Entrar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;