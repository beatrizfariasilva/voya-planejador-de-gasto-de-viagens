package exception;

import java.util.UUID;

public class UsuarioNaoEncontradoException extends RuntimeException {

    public UsuarioNaoEncontradoException(UUID id) {
        super("Usuário não encontrado. ID: " + id);
    }
}