package com.voya.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;

import com.voya.dto.RecuperarSenhaDTO;
import com.voya.dto.UserRequestDTO;
import com.voya.dto.UserResponseDTO;
import com.voya.model.Usuario;
import com.voya.service.UsuarioService;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.UUID;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    UsuarioService userService;

    @GetMapping("/listar")
    public Iterable<Usuario> listar() {
        return userService.listarUsuarios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuarioPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.buscarUsuarioPorId(id));
    }

    @PostMapping("/adicionar")
    public UserResponseDTO criarUsuario(@RequestBody UserRequestDTO usuario) {
        return userService.novoUsuario(usuario);
    }

    @PatchMapping("/atualizar/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(
            @PathVariable UUID id,
            @RequestBody Usuario usuario) {

        return ResponseEntity.ok(
                userService.atualizarUsuario(id, usuario));
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable UUID id) {
        userService.deletarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/validar-email/{email}")
    public ResponseEntity<String> validarEmail(
            @PathVariable String email) {

        userService.validarEmail(email);

        return ResponseEntity.ok("Email encontrado");
    }

    @PatchMapping("/recuperar-senha")
    public ResponseEntity<String> recuperarSenha(
            @RequestBody RecuperarSenhaDTO request) {

        userService.recuperarSenha(
                request.getEmail(),
                request.getSenha());

        return ResponseEntity.ok(
                "Senha alterada com sucesso.");
    }
}