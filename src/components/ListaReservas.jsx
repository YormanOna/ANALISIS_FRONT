import React, { useState, useEffect } from 'react';
import { obtenerReservas } from '../api/projectapi'; // Asegúrate de tener esta función en tu API

export function ListaReservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    async function cargarReservas() {
      try {
        const respuesta = await obtenerReservas();
        setReservas(respuesta.data || []); // Asegúrate de manejar respuestas vacías
      } catch (error) {
        console.error('Error al obtener reservas', error);
      }
    }

    cargarReservas();
  }, []);

  // Verifica si reservas está vacío o si tiene datos válidos
  if (!reservas.length) {
    return <p>No hay reservas disponibles.</p>;
  }

  return (
    <div className="lista-reservas">
      <h2>Lista de Reservas</h2>
      <table>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Fecha</th>
            <th>Dirección</th>
            <th>Bebidas</th>
            <th>Extras</th>
            <th>Costo Estimado</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva, index) => (
            <tr key={index}>
              <td>{reserva.servicio || 'N/A'}</td>
              <td>{new Date(reserva.fecha).toLocaleString() || 'N/A'}</td>
              <td>{reserva.direccion || 'N/A'}</td>
              <td>
              {reserva.cocteles ? (typeof reserva.cocteles === 'string' ? JSON.parse(reserva.cocteles) : reserva.cocteles).map((coctel, i) => (
  <div key={i}>{coctel.nombre} ({coctel.cantidad})</div>
)) : 'N/A'}

              </td>
              <td>
                {reserva.extras ? (
                  <div>
                    {reserva.extras.dj && <div>DJ - $200</div>}
                    {reserva.extras.mobiliario && <div>Mobiliario - $150</div>}
                    {reserva.extras.lugar && <div>Lugar - $300</div>}
                  </div>
                ) : 'N/A'}
              </td>
              <td>${reserva.costo_estimado || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
