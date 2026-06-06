package com.voya.service;

import org.springframework.stereotype.Service;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;

import com.voya.dto.UserRequestDTO;
import com.voya.dto.UserResponseDTO;
import com.voya.exception.UsuarioJaExisteException;
import com.voya.exception.UsuarioNaoEncontradoException;
import com.voya.model.Usuario;
import com.voya.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public UserResponseDTO novoUsuario(UserRequestDTO usuario) {

        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new UsuarioJaExisteException(
                    "Já existe um usuário cadastrado com este e-mail.");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(usuario.getNome());
        novoUsuario.setEmail(usuario.getEmail());
        novoUsuario.setSenha(usuario.getSenha());

        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);
        UserResponseDTO response = new UserResponseDTO(usuarioSalvo.getId(), usuarioSalvo.getNome(),
                usuarioSalvo.getEmail());

        return response;
    }

    public Usuario buscarUsuarioPorId(UUID id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNaoEncontradoException(id));
    }

    public Usuario atualizarUsuario(UUID id, Usuario usuario) {

        Usuario user = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNaoEncontradoException(id));

        if (usuario.getNome() != null) {
            user.setNome(usuario.getNome());
        }

        if (usuario.getEmail() != null) {
            user.setEmail(usuario.getEmail());
        }

        if (usuario.getSenha() != null) {
            user.setSenha(usuario.getSenha());
        }

        return usuarioRepository.save(user);
    }

    public void deletarUsuario(UUID id) {

        Usuario user = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNaoEncontradoException(id));
        usuarioRepository.delete(user);
    }

    public void validarEmail(String email) {

        usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsuarioNaoEncontradoException(
                        "Nenhum usuário encontrado com este e-mail."));
    }

    public void recuperarSenha(String email, String novaSenha) {

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsuarioNaoEncontradoException(
                        "Nenhum usuário encontrado com este e-mail."));

        usuario.setSenha(novaSenha);

        usuarioRepository.save(usuario);
    }
}
