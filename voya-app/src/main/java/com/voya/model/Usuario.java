package com.voya.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
public class Usuario {
    
    @Id
    @GeneratedValue
    private UUID id;
    
    private String nome;
    private String email;
    private String senha;
}
