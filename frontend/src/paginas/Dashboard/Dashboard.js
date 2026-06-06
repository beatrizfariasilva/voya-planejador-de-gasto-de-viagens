'use client';
import Sidebar from "../../components/Sidebar/Sidebar";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import CardPrevisao from "../../components/CardPrevisao/CardPrevisao";
import CardResumo from "../../components/CardResumo/CardResumo";
import Footer from "../../components/Footer/Footer";
import { ChevronUp } from 'lucide-react';
import ProtectedRoute from "@/components/ProtectedRoute";
import React from 'react';
import './Dashboard.css';
import { useAuthStore } from "../../store/authStore";

function Dashboard() {
  const usuarioLogado = useAuthStore(
    (state) => state.usuario
  );
  return (
    <ProtectedRoute>
      <div className="dashboard-page">

        <div className="dashboard-container">
          <Sidebar />

          <div className="main-content">
            <Cabecalho userName={usuarioLogado?.nome} />

            <main className="cards-grid">
              <CardPrevisao />
              <CardResumo />
            </main>
          </div>
        </div>

        <Footer />


      </div>
    </ProtectedRoute>
  );
}

export default Dashboard;