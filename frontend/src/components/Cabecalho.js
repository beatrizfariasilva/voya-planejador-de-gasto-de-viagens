import { HelpCircle } from 'lucide-react';
import './Cabecalho.css';

function Cabecalho({ userName = "Beatriz" }) {
  return (
    <div className="cabecalho1">
      <div>
        <h1 className="nomeUsuario">
          Olá, {userName}! 
          <span role="img">👋🏽</span>
        </h1>
        <p className="textinho">
          Vamos planejar sua próxima viagem?
        </p>
      </div>
    </div>
  );
}

export default Cabecalho;