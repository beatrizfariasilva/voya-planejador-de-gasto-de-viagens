'use client';
import React from 'react';
import { DollarSign, Home, Utensils, Camera, Wine, Car, BookmarkCheck, ChevronRight } from 'lucide-react';
import './CardResumo.css';

export default function CardResumo({ dadosResultado }) {
  const custoTotal = dadosResultado?.custoTotal || 4850;
  const faixaMin = dadosResultado?.faixaMin || 4200;
  const faixaMax = dadosResultado?.faixaMax || 5600;
  
  const categorias = dadosResultado?.categorias || [
    { nome: 'Hospedagem', porcentagem: 41, valor: 2000, icone: <Home size={16} /> },
    { nome: 'Passeios', porcentagem: 19, valor: 900, icone: <Camera size={16} /> },
    { nome: 'Alimentação', porcentagem: 15, valor: 750, icone: <Utensils size={16} /> },
    { nome: 'Vida noturna', porcentagem: 12, valor: 600, icone: <Wine size={16} /> },
    { nome: 'Transporte', porcentagem: 8, valor: 400, icone: <Car size={16} /> },
  ];

  const lidarComSalvar = () => {
    console.log("qq coisa");
  };

  return (
    <div className="card-resumo">
      <div className="resumo-topo">
        <div className="badge-custo">
          <DollarSign size={14} />
          <span>CUSTO TOTAL ESTIMADO</span>
        </div>
        
        <h1 className="valor-total">R$ {custoTotal.toLocaleString('pt-BR')}</h1>
        
        <div className="faixa-preco">
          <BookmarkCheck size={16} />
          <span>Faixa de preço: R$ {faixaMin.toLocaleString('pt-BR')} - R$ {faixaMax.toLocaleString('pt-BR')}</span>
        </div>
      </div>

      <div className="resumo-categorias">
        <h3>Gasto por categoria</h3>
        
        <div className="lista-categorias">
          {categorias.map((cat, index) => (
            <div key={index} className="linha-categoria">
              <div className="cat-info-esquerda">
                <span className="cat-icone">{cat.icone}</span>
                <span className="cat-nome">{cat.nome}</span>
              </div>
              
              <div className="cat-barra-container">
                <div className="cat-barra-progresso" style={{ width: `${cat.porcentagem}%` }}></div>
              </div>
              
              <div className="cat-valores">
                <span className="cat-porcentagem">{cat.porcentagem}%</span>
                <span className="cat-valor-moeda">R$ {cat.valor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="resumo-rodape">

        <button onClick={lidarComSalvar} className="btn-salvar-previsao">
          <BookmarkCheck size={18} />
          <span>Salvar esta previsão</span>
        </button>
      </div>

    </div>
  );
}