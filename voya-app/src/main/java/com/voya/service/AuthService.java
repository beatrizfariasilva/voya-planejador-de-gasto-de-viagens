package com.voya.service;

import org.springframework.stereotype.Service;

import com.voya.dto.LoginRequestDTO;
import com.voya.dto.LoginResponseDTO;
import com.voya.model.Usuario;
import com.voya.repository.UsuarioRepository;

@Service
public class AuthService {

    private final UsuarioRepository userRepository;
    private final JwtService jwtService;

    public AuthService(
            UsuarioRepository userRepository,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public LoginResponseDTO login(LoginRequestDTO request) {

        Usuario usuario = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!usuario.getSenha().equals(request.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }

        String token = jwtService.gerarToken(usuario.getEmail());

        LoginResponseDTO response = new LoginResponseDTO();

        response.setId(usuario.getId());
        response.setNome(usuario.getNome());
        response.setEmail(usuario.getEmail());
        response.setToken(token);

        return response;
    }
}