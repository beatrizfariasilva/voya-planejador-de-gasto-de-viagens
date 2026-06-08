import { API_URL } from "@/services/api";

export async function cadastrar(usuario) {
  const response = await fetch(
    `${API_URL}/api/usuarios/adicionar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    }
  );

  if (!response.ok) {
    const mensagem = await response.text();
    throw new Error(mensagem);
  }

  return response.json();
}