import { API_URL } from "@/services/api";

export async function validarEmail(email) {
  const response = await fetch(
    `${API_URL}/api/usuarios/validar-email/${email}`
  );

  if (!response.ok) {
    const mensagem = await response.text();
    throw new Error(mensagem);
  }

  return response.text();
}

export async function recuperarSenha(
  email,
  senha
) {
  const response = await fetch(
    `${API_URL}/api/usuarios/recuperar-senha`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    }
  );

  if (!response.ok) {
    const mensagem = await response.text();
    throw new Error(mensagem);
  }

  return response.text();
}