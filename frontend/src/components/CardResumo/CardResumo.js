'use client';
import React from 'react';
import { DollarSign, Home, Utensils, Camera, Wine, BookmarkCheck, Calendar, Users } from 'lucide-react';
import './CardResumo.css';

export default function CardResumo({ dadosResultado }) {
    const valorTotal = dadosResultado?.valorTotal
    const escolhas = dadosResultado?.escolhas
    const custoPorDia = valorTotal / escolhas.dias;
    const custoPorPessoa = valorTotal / escolhas.pessoas;

    const pesosBase = { hospedagem: 14, passeios: 7, alimentacao: 5, vidaNoturna: 4 };
    const pontosHosp = escolhas.hospedagem * pesosBase.hospedagem;
    const pontosPass = escolhas.passeios * pesosBase.passeios;
    const pontosAlim = escolhas.alimentacao * pesosBase.alimentacao;
    const pontosVida = escolhas.vidaNoturna * pesosBase.vidaNoturna;

    const totalPontos = pontosHosp + pontosPass + pontosAlim + pontosVida;

    const categorias = [
        { nome: 'Hospedagem', porcentagem: Math.round((pontosHosp / totalPontos) * 100), valor: (pontosHosp / totalPontos) * valorTotal, icone: <Home size={16} /> },
        { nome: 'Passeios', porcentagem: Math.round((pontosPass / totalPontos) * 100), valor: (pontosPass / totalPontos) * valorTotal, icone: <Camera size={16} /> },
        { nome: 'Alimentação', porcentagem: Math.round((pontosAlim / totalPontos) * 100), valor: (pontosAlim / totalPontos) * valorTotal, icone: <Utensils size={16} /> },
        { nome: 'Vida noturna', porcentagem: Math.round((pontosVida / totalPontos) * 100), valor: (pontosVida / totalPontos) * valorTotal, icone: <Wine size={16} /> }
    ];

    return (
        <div className="card-resumo">
            <div className="resumo-topo">
                <div className="badge-custo">
                    <DollarSign size={14} /> <span>CUSTO TOTAL ESTIMADO</span>
                </div>
                
                <h1>{valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>

                <div className="faixa-preco">
                    <BookmarkCheck size={14} />
                    <span>Faixa de preço: {(valorTotal * 0.85).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} - {(valorTotal * 1.15).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>


                <div className="metricas-principais">
                    <div className="metrica-box">
                        <Calendar size={18} className="icon-metrica" />
                        <div className="metrica-texto">
                            <span>Por dia</span>
                            <strong>{custoPorDia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                        </div>
                    </div>
                    <div className="metrica-box">
                        <Users size={18} className="icon-metrica" />
                        <div className="metrica-texto">
                            <span>Por pessoa</span>
                            <strong>{custoPorPessoa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="resumo-corpo">
                <h3>Gasto por categoria</h3>
                <div className="lista-categorias">
                    {categorias.map((cat, index) => (
                        <div key={index} className="categoria-item">
                            <div className="cat-info">
                                {cat.icone}
                                <span>{cat.nome}</span>
                            </div>
                            <div className="cat-barra-container">
                                <div className="cat-barra-progresso" style={{ width: `${cat.porcentagem}%` }}></div>
                            </div>
                            <span className="cat-porcentagem">{cat.porcentagem}%</span>
                            <span className="cat-valor">{cat.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}