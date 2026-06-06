'use client';
import Sidebar from "../components/Sidebar";
import Cabecalho from "../components/Cabecalho";
import CardPrevisao from "../components/CardPrevisao";
import CardResumo from "../components/CardResumo";
import Footer from "../components/Footer";
import { ChevronUp } from 'lucide-react';
import React from 'react';
import './Dashbord.css';

function Dashboard() {
  const [usuario, setUsuario] = React.useState("Usuario");
  const inicial = usuario ? usuario.charAt(0) : 'U';

  return (
    <div className="dashboard-page">

      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          <Cabecalho userName={usuario} />

          <main className="cards-grid">
            <CardPrevisao />
            <CardResumo />
          </main>
        </div>
      </div>

    <Footer />

    </div>
);
}

export default Dashboard;