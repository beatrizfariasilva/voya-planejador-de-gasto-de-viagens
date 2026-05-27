package com.voya.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
public class Viagem {
    
    @Id
    @GeneratedValue
    private UUID id;

    private String destino;
    private int dias;
    private int pessoas;
    private String hospedagem;
    private String passeios;
    private String vidaNoturna;
    private String alimentacao;
    private double custoEstimado;

    @ManyToOne
    private Usuario usuario;
}
