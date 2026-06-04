package com.voya.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
public class Viagem {
    
    @Id
    @GeneratedValue
    private UUID id;

    private String destino;
    private int dias;
    private int pessoas;
    private int hospedagem;
    private int passeios;
    private int vidaNoturna;
    private int alimentacao;
    private double custoEstimado;

    @ManyToOne
    private Usuario usuario;
}
