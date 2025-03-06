import { useEffect, useState } from 'react';

const useWebSocket = (url) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            console.log('Conexión WebSocket establecida');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Mensaje recibido:', data);
            setMessages((prev) => [...prev, data]);
        };

        socket.onclose = () => {
            console.log('Conexión WebSocket cerrada');
        };

        socket.onerror = (error) => {
            console.error('Error en WebSocket:', error);
        };

        return () => {
            socket.close();
        };
    }, [url]);

    return messages;
};

export default useWebSocket;
