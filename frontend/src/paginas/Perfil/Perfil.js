'use client';
import React, { useState } from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { User, Mail, Save, Lock } from 'lucide-react';
import { useAuthStore } from "../../store/authStore";
import { useRouter } from 'next/navigation';
import './Perfil.css';

export default function Perfil() {
    const usuarioLogado = useAuthStore((state) => state.usuario);
    const setUsuario = useAuthStore((state) => state.setUsuario);
    const [formData, setFormData] = useState({ 
        nome: '', 
        email: '', 
        senha: '' 
    });

    const handleSalvar = async (e) => {
        e.preventDefault();

        if (!formData.senha.trim()) {
            alert("Por favor, defina uma senha para confirmar as alterações.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/atualizar/${usuarioLogado.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const usuarioAtualizado=await response.json();
                setUsuario(usuarioAtualizado);
                alert("Perfil atualizado com sucesso!");
                setFormData(prev => ({ ...prev, senha: '' }));
            } else {
                alert("Erro ao atualizar perfil.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro de conexão com o servidor.");
        }
    };

    const logout = useAuthStore((state) => state.logout);
    const router=useRouter();

    const handleExcluirConta = async () => {
        const confirmacao = window.confirm("Tem certeza que deseja excluir sua conta? Essa ação é irreversível.");
        if (confirmacao) {
            try {
                const response = await fetch(`http://localhost:8080/api/usuarios/deletar/${usuarioLogado.id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert("Conta excluída com sucesso.");
                    logout();
                    router.push('/login'); 
                } else {
                    alert("Erro ao excluir a conta.");
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            }
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
                                            <span>{usuarioLogado?.email }</span>
                                        </div>
                                    </div>

                                    <div className="form-grid">
                                        <div className="input-group">
                                            <label><User size={16}/> Novo nome </label>
                                            <input 
                                                type="text"
                                                autoComplete="off" 
                                                value={formData.nome}
                                                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                                placeholder="Digite o novo nome"
                                            />
                                        </div>

                                        <div className="input-group">
                                            <label><Mail size={16}/> Novo e-mail </label>
                                            <input 
                                                type="email"
                                                autoComplete="off" 
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                placeholder="Digite o novo e-mail"
                                            />
                                        </div>

                                        <div className="input-group">
                                            <label><Lock size={16}/> Nova senha</label>
                                            <input 
                                                type="password"
                                                autoComplete="off" 
                                                value={formData.senha || ''}
                                                onChange={(e) => setFormData({...formData, senha: e.target.value})}
                                                placeholder="Defina uma nova senha"
                                            />
                                        </div>
                                    </div>

                                    <div className="perfil-actions">
                                        <button type="submit" className="btn-salvar-perfil">
                                            <Save size={18} /> Salvar alterações
                                        </button>
                                    </div>
                                </form>
                                <div className="danger-zone">
                                    <hr />
                                    <h4>Excluir conta</h4>
                                    <p>Ao excluir sua conta, todos os seus dados e histórico de viagens serão removidos permanentemente.</p>
                                    <button className="btn-excluir-conta" onClick={handleExcluirConta}>
                                        Excluir minha conta permanentemente
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