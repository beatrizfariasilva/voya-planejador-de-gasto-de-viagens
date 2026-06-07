'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MapPin, Trash2, Edit3, Search } from 'lucide-react';
import { useAuthStore } from "../../store/authStore";
import './Historico.css';
import { Alert } from "../../components/Alertas/Alertas";

export default function Historico() {
    const [viagens, setViagens] = useState([]);
    const [busca, setBusca] = useState('');
    const usuarioLogado = useAuthStore((state) => state.usuario);
    const [viagemParaEditar, setViagemParaEditar] = useState(null);
    const [isModalAberto, setIsModalAberto] = useState(false);


    useEffect(() => {
        const buscarHistorico = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioLogado.id}/viagens`);
                if (response.ok) {
                    const data = await response.json();
                    setViagens(data);
                }
            } catch (error) {
                console.error("Erro ao buscar histórico:", error);
            }
        };
        if (usuarioLogado?.id) buscarHistorico();
    }, [usuarioLogado]);

    const excluirViagem = async (id) => {
        const result = await Alert.confirm(
            "Excluir viagem?",
            "Esta ação não poderá ser desfeita."
        );
        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioLogado.id}/viagens/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    setViagens(viagens.filter(v => v.id !== id));
                    Alert.success(
                        "Viagem excluída!",
                        "A viagem foi removida com sucesso."
                    );
                }
            } catch (error) {
                console.log(error);
                Alert.error(
                    "Erro ao excluir viagem.",
                    "Não foi possível concluir a operação."
                );
            }
        }
    };

    const viagensFiltradas = viagens.filter(v =>
        v.destino.toLowerCase().includes(busca.toLowerCase())
    );

    const prepararEdicao = (viagem) => {
        setViagemParaEditar({ ...viagem });
        setIsModalAberto(true);
    };

    const salvarEdicao = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioLogado.id}/viagens/${viagemParaEditar.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(viagemParaEditar)
            });

            if (response.ok) {
                setViagens(viagens.map(v => v.id === viagemParaEditar.id ? viagemParaEditar : v));
                setIsModalAberto(false);
            }
        } catch (error) {
            console.error("Erro ao atualizar viagem:", error);
        }
    };

    return (
        <ProtectedRoute>
            <div className="dashboard-page">
                <div className="dashboard-container">

                    <Sidebar />

                    <div className="main-content">
                        <main className="historico-scroll-area">
                            <div className="historico-container">
                                <header className="historico-header">
                                    <h2>Meu Histórico</h2>
                                    <div className="busca-container">
                                        <Search size={18} />
                                        <input type="text" placeholder="Procurar viagem..." value={busca} onChange={(e) => setBusca(e.target.value)} />
                                    </div>
                                </header>

                                <div className="lista-viagens">
                                    {viagensFiltradas.map((v) => (
                                        <div key={v.id} className="viagem-item">
                                            <div className="viagem-info-principal">
                                                <MapPin size={20} className="icon-destino" />
                                                <div>
                                                    <h3>{v.destino}</h3>
                                                    <span className="mini-resumo">
                                                        Hospedagem: {v.hospedagem === 1 ? 'Econômica' : v.hospedagem === 3 ? 'Luxo' : 'Conforto'} |
                                                        Alimentação: {v.alimentacao === 1 ? 'Básica' : v.alimentacao === 3 ? 'Premium' : 'Padrão'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="viagem-valor">
                                                <strong>{v.custoEstimado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                                            </div>
                                            <div className="viagem-acoes">
                                                <button className="btn-acao delete" onClick={() => excluirViagem(v.id)}><Trash2 size={18} /></button>
                                                <button className="btn-acao edit" onClick={() => prepararEdicao(v)}><Edit3 size={18} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <Footer />
                {isModalAberto && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Editar destino</h3>
                            <input
                                type="text"
                                value={viagemParaEditar.destino}
                                onChange={(e) => setViagemParaEditar({ ...viagemParaEditar, destino: e.target.value })}
                                className="input-edicao-destino"
                            />
                            <div className="modal-actions">
                                <button onClick={() => setIsModalAberto(false)} className="btn-save">Cancelar</button>
                                <button onClick={salvarEdicao} className="btn-save">Salvar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}