'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlusCircle, Clock3, User } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href="/dashboard">
        <img
          src="/logo.png"
          alt="Voya"
          className="logo"
        />
      </Link>


      <nav className="menu">
        <Link
          href="/dashboard"
          className={`menu-item ${pathname === '/dashboard' ? 'active' : ''
            }`}
        >
          <PlusCircle size={18} />
          <span>Nova previsão</span>
        </Link>

        <Link
          href="/dashboard/historico"
          className={`menu-item ${pathname === '/dashboard/historico' ? 'active' : ''
            }`}
        >
          <Clock3 size={18} />
          <span>Histórico</span>
        </Link>

        <Link
          href="/dashboard/perfil"
          className={`menu-item ${pathname === '/dashboard/perfil' ? 'active' : ''
            }`}
        >
          <User size={18} />
          <span>Perfil</span>
        </Link>
      </nav>
    </aside>
  );
}