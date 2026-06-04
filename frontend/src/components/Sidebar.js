import "./Sidebar.css";
import {
  PlusCircle,
  Clock3,
  User,
  ChevronDown
} from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src="logo.png" alt="voya" className="logo"/>
      <div className="menu">
        <div className="item"> <PlusCircle size={18} /> Nova previsão</div>
        <div div className="item"> <Clock3 size={18} /> Histórico</div>
        <div div className="item"> <User size={18} /> Perfil</div>
      </div>

      <div className="perfil">
        <span className="nome">Usuario</span>
        <ChevronDown size={16}/>
      </div>
      
    </div>
  );
}

export default Sidebar;