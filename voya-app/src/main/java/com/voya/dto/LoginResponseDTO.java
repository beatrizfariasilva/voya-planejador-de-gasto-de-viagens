package com.voya.dto;

import java.util.UUID;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class LoginResponseDTO {
    private String token;
    private UUID id;
    private String nome;
    private String email;
}