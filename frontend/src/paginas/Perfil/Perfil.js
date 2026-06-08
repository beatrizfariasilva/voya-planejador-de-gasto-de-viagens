'use client';
import React, { useEffect,useState } from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { User, Mail, Save, Lock } from 'lucide-react';
import { useAuthStore } from "../../store/authStore";
import { useRouter } from 'next/navigation';
import './Perfil.css';
import { Alert } from "../../components/Alertas/Alertas";
import { useMutation } from '@tanstack/react-query';
import { API_URL } from "@/services/api";

export default function Perfil() {
    const usuarioLogado = useAuthStore((state) => state.usuario);
    const setUsuario = useAuthStore((state) => state.setUsuario);
    const [formData, setFormData] = useState({ nome: '', email: '', senha: '' });
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();

    useEffect(() => {
        if (usuarioLogado) {
            setFormData({
                nome: usuarioLogado.nome || '',
                email: usuarioLogado.email || '',
                senha: ''
            });
        }
    }, [usuarioLogado]);

    const updateMutation = useMutation({
        mutationFn: async (dados) => {
            const response = await fetch(`${API_URL}/api/usuarios/atualizar/${usuarioLogado.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            if (!response.ok) throw new Error("Erro ao atualizar");
            return response.json();
        },
        onSuccess: (usuarioAtualizado) => {
            setUsuario(usuarioAtualizado);
            Alert.success(
                "Perfil atualizado com sucesso!",
                "Suas informações foram salvas com êxito."
            );
            setFormData(prev => ({ ...prev, senha: '' }));
        },
        onError: (error) => {
            console.error("Erro na requisição:", error);
            Alert.error(
                "Não foi possível atualizar o perfil.",
                "Ocorreu um erro ao salvar suas informações. Tente novamente."
            );
        }
    });
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${API_URL}/api/usuarios/deletar/${usuarioLogado.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error("Erro ao deletar");
            return response;
        },
        onSuccess: () => {
            Alert.success(
                "Conta excluída com sucesso.",
                "Sua conta foi removida. Esperamos poder recebê-la novamente no futuro."
            );
            logout();
            router.push('/login');
        },
        onError: (error) => {
            console.error("Erro na requisição:", error);
            Alert.error(
                "Não foi possível excluir a conta.",
                "Ocorreu um erro ao processar sua solicitação. Tente novamente."
            );
        }
    });

    const handleSalvar = (e) => {
        e.preventDefault();
        if (!formData.nome.trim()) {
            Alert.error("Nome não informado", "Por favor, informe seu nome para prosseguir.");
            return;
        }
        if (!formData.email.trim()) {
            Alert.error("Confirmação necessária", "Digite seu e-mail para prosseguir com as alterações.");
            return;
        }
        if (!formData.senha.trim()) {
            Alert.error("Confirmação necessária", "Digite sua senha para salvar as alterações realizadas.");
            return;
        }
        updateMutation.mutate(formData);
    };

    const handleExcluirConta = () => {
        const confirmacao = Alert.confirm("Tem certeza que deseja excluir sua conta? Essa ação é irreversível.");
        if (confirmacao.isConfirmed) {
            deleteMutation.mutate();
        }
    };

    return (
        <ProtectedRoute>
            <div className="dashboard-page">
                <div className="dashboard-container">
                    <Sidebar />
                    <main className="main-content">
                        <div className="perfil-scroll-area">
                            <header className="perfil-header">
                                <h2>Editar perfil</h2>
                            </header>

                            <section className="perfil-card">
                                <form onSubmit={handleSalvar}>
                                    <div className="avatar-section">
                                        <div className="avatar-placeholder">
                                            {formData.nome.charAt(0).toUpperCase()}
                                            <button type="button" className="btn-camera"></button>
                                        </div>
                                        <div>
                                            <h4>{usuarioLogado?.nome || "Usuário"}</h4>
                                            <span>{usuarioLogado?.email}</span>
                                        </div>
                                    </div>

                                    <div className="form-grid">
                                        <div className="input-group">
                                            <label><User size={16} /> Novo nome </label>
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                value={formData.nome}
                                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                                placeholder="Digite o novo nome"
                                            />
                                        </div>

                                        <div className="input-group">
                                            <label><Mail size={16} /> Novo e-mail </label>
                                            <input
                                                type="email"
                                                autoComplete="off"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="Digite o novo e-mail"
                                            />
                                        </div>

                                        <div className="input-group">
                                            <label><Lock size={16} /> Nova senha</label>
                                            <input
                                                type="password"
                                                autoComplete="off"
                                                value={formData.senha || ''}
                                                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                                                placeholder="Defina uma nova senha"
                                            />
                                        </div>
                                    </div>

                                    <div className="perfil-actions">
                                        <button
                                            type="submit"
                                            className="btn-salvar-perfil"
                                            disabled={updateMutation.isPending}
                                        >
                                            <Save size={18} /> {updateMutation.isPending ? 'Salvando...' : 'Salvar alterações'}
                                        </button>
                                    </div>
                                </form>
                                <div className="danger-zone">
                                    <hr />
                                    <h4>Excluir conta</h4>
                                    <p>Ao excluir sua conta, todos os seus dados e histórico de viagens serão removidos permanentemente.</p>
                                    <button
                                        className="btn-excluir-conta"
                                        onClick={handleExcluirConta}
                                        disabled={deleteMutation.isPending}
                                    >
                                        {deleteMutation.isPending ? 'Excluindo...' : 'Excluir minha conta permanentemente'}
                                    </button>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </ProtectedRoute>
    );
}