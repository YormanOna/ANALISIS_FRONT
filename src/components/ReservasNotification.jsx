import React, { useEffect } from "react";
import useWebSocket from "../pages/client/useWebSocket"; // Asegúrate de tener este hook configurado correctamente
import butterup from "butteruptoasts";
import "../../src/styles/butterup-2.0.0/butterup.css";

const ReservationNotification = () => {
  // Conexión al WebSocket para obtener los mensajes
  const messages = useWebSocket("wss://c967-177-53-215-61.ngrok-free.app/ws/notifications/");

  useEffect(() => {
      setTimeout(() => {
        messages.forEach((msg) => {
          console.log("Procesando mensaje:", msg); // Depurar cada mensaje individualmente

          // Verificar si el título del mensaje contiene 'reserva creada'
          if (msg.title && msg.title.includes("reserva creada")) {
            console.log("Mostrando notificación para reserva:", msg); // Depurar cuando se detecta una reserva

            butterup.toast({
              title: msg.title || "Notificación de Reserva",
              message: `${msg.title}: ${msg.body}` || "Nueva reserva recibida.",
              location: "top-right",
              icon: true,
              dismissable: true,
              type: "info",
            });
          }
        });
      }, 2000); // 5000 ms de espera (5 segundos)
    
  }); 

  return null;
};

export default ReservationNotification;
