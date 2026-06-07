import Swal from "sweetalert2";
import './Alerta.css';

export const Alert = {
  success(title, text) {
    return Swal.fire({
      icon: "success",
      title,
      text,
      confirmButtonColor: "#0D7C94",
    });
  },

  error(title, text) {
    return Swal.fire({
      icon: "error",
      title,
      text,
      confirmButtonColor: "#0D7C94",
    });
  },

  warning(title, text) {
    return Swal.fire({
      icon: "warning",
      title,
      text,
      confirmButtonColor: "#0D7C94",
    });
  },

  confirm(title, text) {
    return Swal.fire({
      title,
      text,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Excluir",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#0D7C94",
      confirmButtonColor: "#535252",
    });
  },

  toast(icon, title) {
    return Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },
};