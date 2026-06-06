import {
  PlusCircle,
  Clock3,
  User
} from "lucide-react";

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

        <button className="menu-item active">
          <PlusCircle size={18}/>
          Nova previsão
        </button>

        <button className="menu-item">
          <Clock3 size={18}/>
          Histórico
        </button>

        <button className="menu-item">
          <User size={18}/>
          Perfil
        </button>

      </nav>

    </aside>
  );
}