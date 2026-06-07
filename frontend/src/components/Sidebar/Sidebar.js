'use client';
import Link from 'next/link';
import {PlusCircle, Clock3, User} from "lucide-react";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <img
        src="/logo.png"
        alt="Voya"
        className="logo"
      />

      <nav className="menu">

        <Link href="/dashboard" className="menu-item active">
          <PlusCircle size={18}/>
          <span>Nova previsão</span>
        </Link>

        <Link href="/dashboard/historico" className="menu-item">
          <Clock3 size={18}/>
          <span>Histórico</span>
        </Link>

        <Link href="/dashboard/perfil" className="menu-item">
          <User size={18}/>
          <span>Perfil</span>
        </Link>

      </nav>

    </aside>
  );
}