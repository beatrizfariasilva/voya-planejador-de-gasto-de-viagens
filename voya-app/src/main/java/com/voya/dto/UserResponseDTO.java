package com.voya.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseDTO {
    private UUID id;
    private String nome;
    private String email;
}
