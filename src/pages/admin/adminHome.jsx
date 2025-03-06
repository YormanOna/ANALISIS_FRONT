import React from "react";
import { CoctelManager } from "../../components/managerCoctails";
import { PaqueteManager } from "../../components/managerPaquetes";
import { ListaReservas } from "../../components/ListaReservas"; // Asegúrate de importar el nuevo componente
import ReservationNotification from "../../components/ReservasNotification"; // Asegúrate de importar el nuevo componente
import '../../styles/admin.css';

export function AdminHome() {
  const [activeTab, setActiveTab] = React.useState("cocktails");

  return (
    <div className="bodyA">
    <div className="admin-container">
    <ReservationNotification />
      <h1>Panel de Administración</h1>
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === "cocktails" ? "active" : ""}`}
          onClick={() => setActiveTab("cocktails")}
        >
          Cócteles
        </button>
        <button
          className={`tab-button ${activeTab === "packages" ? "active" : ""}`}
          onClick={() => setActiveTab("packages")}
        >
          Paquetes
        </button>
        <button
          className={`tab-button ${activeTab === "reservations" ? "active" : ""}`}
          onClick={() => setActiveTab("reservations")}
        >
          Reservas
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "cocktails" && <CoctelManager />}
        {activeTab === "packages" && <PaqueteManager />}
        {activeTab === "reservations" && <ListaReservas />}
      </div>
    </div>
    </div>
  );
}
