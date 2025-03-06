import React, { useEffect, useRef } from "react";
import useWebSocket from "../pages/client/useWebSocket";
import butterup from "butteruptoasts";
import "../../src/styles/butterup-2.0.0/butterup.css";

const Notifications = ({ onNewNotification }) => {
  const messages = useWebSocket("ws://localhost:8000/ws/notifications/");
  const processedMessages = useRef(new Set()); // Almacena mensajes ya procesados

  useEffect(() => {
    if (messages.length > 0) {
      console.log("Mensajes WebSocket recibidos:", messages);

      messages.forEach((msg) => {
        const messageKey = `${msg.title}-${msg.body}`; // Clave única para identificar mensajes

        if (!processedMessages.current.has(messageKey)) {
          console.log("Mensaje procesado:", msg);

          // Agregar el mensaje al conjunto de mensajes procesados
          processedMessages.current.add(messageKey);

          // Mostrar notificación con butterup
          butterup.toast({
            title: msg.title || "Notificación",
            message: `${msg.title}: ${msg.body}` || "Nuevo mensaje recibido.",
            location: "top-right",
            icon: true,
            dismissable: true,
            type: "info",
          });

          const isCoctelMessage =
            msg.title.includes("cóctel") || msg.body.includes("cóctel");

          // Retrasar la actualización para que la notificación aparezca primero
          if (isCoctelMessage) {
            console.log("Notificación de cóctel recibida. Actualizando lista...");
            setTimeout(() => {
              onNewNotification();
            }, 500);
          }
        } else {
          console.log("Mensaje duplicado ignorado:", msg);
        }
      });
    }
  }, [messages, onNewNotification]);

  return null;
};

export default Notifications;
