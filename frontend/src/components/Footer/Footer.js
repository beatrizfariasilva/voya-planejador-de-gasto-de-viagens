'use client';
import React from 'react';
import {ChevronUp} from 'lucide-react';
import './Footer.css';
import { useAuthStore } from "../../store/authStore";

function Footer() {

    const usuario = useAuthStore((state) => state.usuario)?.nome || "Usuario";

    const inicial = usuario ? usuario.charAt(0) : 'U';
    const [menuAberto, setMenuAberto] = React.useState(false);

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
                    <div className="footer-menu">
                    <button className="footer-menu-item">
                        Editar perfil
                    </button>

                    <button className="footer-menu-item">
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