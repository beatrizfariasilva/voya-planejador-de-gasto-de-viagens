'use client';
import React from 'react';
import {ChevronUp} from 'lucide-react';
import './Footer.css';
import { useRouter } from 'next/navigation';
import { useAuthStore } from "../../store/authStore";

function Footer() {
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);
    const usuario = useAuthStore((state) => state.usuario)?.nome || "Usuario";

    const inicial = usuario ? usuario.charAt(0) : 'U';
    const [menuAberto, setMenuAberto] = React.useState(false);

    const sair = () => {
        logout(); 
        router.push('/login'); 
    };

    return (
        <div className="dashboard-footer">
        <div className="footer-perfil"  onClick={() => setMenuAberto(!menuAberto)}>
            <div className="footer-avatar">{inicial}</div>
            <div className="footer-info">
                <span className="footer-nome">{usuario}</span>
                <span className="footer-status">Conta Pessoal</span>
            </div>
        
            <ChevronUp size={16} className="footer-chevron" />
            
            <div className="footer-usuario-container" onClick={() => setMenuAberto(!menuAberto)}>

                {menuAberto && (
                    <div className="footer-menu" onClick={() => router.push('/dashboard/perfil')}>
                    <button className="footer-menu-item">
                        Editar perfil
                    </button>

                    <button className="footer-menu-item" onClick={sair}>
                        Sair
                    </button>
                    </div>
                )}
            </div>
        </div>
        
            <div className="footer-links">
                  <h3>voya.com.br</h3>
            </div>
        </div>
    );
}

export default Footer;