'use client';
import React, { useState } from 'react';
import { PlaneTakeoff, MapPin, Calendar, Users, Briefcase, ArrowRight, Home, Utensils, Camera, Wine, Backpack, Luggage , Gem } from 'lucide-react';
import { useAuthStore } from "../../store/authStore"; 
import './CardPrevisao.css';

export default function CardPrevisao({ aoReceberResposta }) {
  const usuarioLogado = useAuthStore((state) => state.usuario);
  const [destino, setDestino]=useState('Recife, PE');
  const [dias, setDias]=useState(1);
  const [pessoas, setPessoas]=useState(1);
  const [estilo, setEstilo]=useState(1);

  const [hospedagem, setHospedagem]=useState(1);
  const [alimentacao, setAlimentacao]=useState(1);
  const [passeios, setPasseios]=useState(1);
  const [vidaNoturna, setVidaNoturna]=useState(1);

  const alterarContador = (tipo, operacao) => {
    if (tipo === 'dias') {
      setDias(prev => operacao === 'mais' ? prev + 1 : Math.max(1, prev - 1));
    } else {
      setPessoas(prev => operacao === 'mais' ? prev + 1 : Math.max(1, prev - 1));
    }
  };

  const lidarComEnvio = (e) => {
        e.preventDefault();
        const dadosParaBackend = { 
            destino, 
            dias, 
            pessoas, 
            estilo,
            hospedagem,
            passeios,
            vidaNoturna,
            alimentacao
        };
    
        console.log("JSON com destino:", dadosParaBackend);
  };

  const calcularEstimativa=async()=> {
    const json ={
      destino: destino,
      dias: dias,
      pessoas: pessoas,
      hospedagem: hospedagem,
      passeios: passeios,
      vidaNoturna: vidaNoturna,
      alimentacao: alimentacao
    };
    
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioLogado.id}/viagens/prever`, {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json),
      });

      if (response.ok) {
        const resultado=await response.json();
        console.log("Recebido pelo java", resultado);
        aoReceberResposta({
          valorTotal: resultado.previsao,
          escolhas: {
            pessoas: pessoas,
            hospedagem: hospedagem,
            alimentacao: alimentacao,
            passeios: passeios,
            vidaNoturna: vidaNoturna,
            dias: dias,
          }
        });
      }
    } catch (error) {
        console.error("Erro ao conectar com Java: ", error);
    }
};





  return (
    <div className="card-previsao">
      <div className="card-header">
        <PlaneTakeoff className="icon-header" size={20} />
        <h2>Nova previsão</h2>
      </div>

      <form onSubmit={lidarComEnvio} className="form-previsao">
        <div className="form-row">
          <div className="form-group flex-1">
            <label><MapPin size={16} /> Destino</label>
            <select value={destino} onChange={(e) => setDestino(e.target.value)} className="input-voya">
                <option value="Rio de Janeiro, RJ">Rio de Janeiro, RJ</option>
                <option value="São Paulo, SP">São Paulo, SP</option>
                <option value="Fortaleza, CE">Fortaleza, CE</option>
                <option value="Foz do Iguaçu, PR">Foz do Iguaçu, PR</option>
                <option value="Natal, RN">Natal, RN</option>
                <option value="Florianópolis, SC">Florianópolis, SC</option>
                <option value="Ouro Preto, MG">Ouro Preto, MG</option>
                <option value="Maragogi, AL">Maragogi, AL</option>
                <option value="Chapada Diamantina, BA">Chapada Diamantina, BA</option>
                <option value="Bonito, MS">Bonito, MS</option>
                <option value="João Pessoa, PB">João Pessoa, PB</option>
                <option value="Arraial do Cabo, RJ">Arraial do Cabo, RJ</option>
                <option value="Recife, PE">Recife, PE</option>
                <option value="Porto de Galinhas, PE">Porto de Galinhas, PE</option>
                <option value="Salvador, BA">Salvador, BA</option>
            </select>
          </div>

          <div className="form-group select-contador">
            <label><Calendar size={16} /> Dias</label>
            <div className="contador-container">
              <button type="button" onClick={() => alterarContador('dias', 'menos')}>-</button>
              <span>{dias}</span>
              <button type="button" onClick={() => alterarContador('dias', 'mais')}>+</button>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group select-contador">
            <label><Users size={16} /> Pessoas</label>
            <div className="contador-container">
              <button type="button" onClick={() => alterarContador('pessoas', 'menos')}>-</button>
              <span>{pessoas}</span>
              <button type="button" onClick={() => alterarContador('pessoas', 'mais')}>+</button>
            </div>
          </div>

          <div className="form-group flex-1">
            <label><Briefcase size={16} /> Estilo da viagem</label>
            <div className="estilo-botoes">
                <button 
                type="button" 
                className={`btn-estilo ${estilo === 1 ? 'ativo' : ''}`} 
                onClick={() => setEstilo(1)}
                title="Mochileiro"
                >
                <Backpack size={20} className={estilo === 1 ? 'icon-ativo' : 'icon-inativo'} />
                </button>

                <button 
                type="button" 
                className={`btn-estilo ${estilo === 2 ? 'ativo' : ''}`}
                onClick={() => setEstilo(2)}
                title="Conforto"
                >
                <Luggage  size={20} className={estilo === 2 ? 'icon-ativo' : 'icon-inativo'} />
                </button>

                <button 
                type="button" 
                className={`btn-estilo ${estilo === 3 ? 'ativo' : ''}`}
                onClick={() => setEstilo(3)}
                title="Luxo"
                >
                <Gem size={20} className={estilo === 3 ? 'icon-ativo' : 'icon-inativo'} />
                </button>
            </div>
          </div>
        </div>

        <div className="preferencias-secao">
          <h3>Preferências</h3>
          
          <div className="preferencias-grid">
            <div className="pref-card">
              <Home size={20} className="pref-icon" />
              <span>Hospedagem</span>
              <div className="bolinhas">
                {[1, 2, 3].map(n => (
                  <span 
                    key={n} 
                    className={`bolinha ${hospedagem >= n ? 'marcada' : ''}`}
                    onClick={() => setHospedagem(n)}
                  />
                ))}
              </div>
            </div>

            <div className="pref-card">
              <Utensils size={20} className="pref-icon" />
              <span>Alimentação</span>
              <div className="bolinhas">
                {[1, 2, 3].map(n => (
                  <span 
                    key={n} 
                    className={`bolinha ${alimentacao >= n ? 'marcada' : ''}`}
                    onClick={() => setAlimentacao(n)}
                  />
                ))}
              </div>
            </div>

            <div className="pref-card">
              <Camera size={20} className="pref-icon" />
              <span>Passeios</span>
              <div className="bolinhas">
                {[1, 2, 3].map(n => (
                  <span 
                    key={n} 
                    className={`bolinha ${passeios >= n ? 'marcada' : ''}`}
                    onClick={() => setPasseios(n)}
                  />
                ))}
              </div>
            </div>

            <div className="pref-card">
              <Wine size={20} className="pref-icon" />
              <span>Vida noturna</span>
              <div className="bolinhas">
                {[1, 2, 3].map(n => (
                  <span 
                    key={n} 
                    className={`bolinha ${vidaNoturna >= n ? 'marcada' : ''}`}
                    onClick={() => setVidaNoturna(n)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <button onClick={calcularEstimativa} className="btn-calcular">
          Calcular estimativa
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}