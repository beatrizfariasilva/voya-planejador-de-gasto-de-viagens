package com.voya.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Usuario {
    
    @Id
    @GeneratedValue
    private UUID id;
    
    private String nome;
    private String email;
    private String senha;

    @JsonIgnore
    @OneToMany(mappedBy = "usuario")
        private List<Viagem> viagens;
}
