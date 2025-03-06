import React, { useState, useEffect } from 'react';
import { obtenerReservas } from '../../api/projectapi';
import '../../styles/calendario.css';

export function Calendario() {
  const barName = "Bananas Cocktails";
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const [reservas, setReservas] = useState([]);
  const [fechasInhabilitadas, setFechasInhabilitadas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [notification, setNotification] = useState(null); // Para mostrar mensajes

  // Cargar reservas desde el backend
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await obtenerReservas(currentMonth + 1, currentYear);
        setReservas(res.data);
      } catch (error) {
        setError("Error al obtener las reservas");
        console.error("Error al obtener las reservas", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservas();
  }, [currentMonth, currentYear]);

  // Mostrar notificación estilizada
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Ocultar después de 3 segundos
  };

  // Manejar la selección de una fecha
  const handleDateSelect = (date) => {
    const reservation = reservas.find((reserva) => reserva.fecha === date);
    if (fechasInhabilitadas.includes(date)) {
      showNotification("Esta fecha está inhabilitada.");
    } else if (reservation) {
      showNotification("Esta fecha ya está reservada.");
    } else {
      setSelectedDate(date);
      showNotification(`Fecha seleccionada: ${new Date(date).toLocaleDateString('es-ES')}`);
    }
  };

  // Inhabilitar o habilitar una fecha
  const handleInhabilitarFecha = (dateString) => {
    if (fechasInhabilitadas.includes(dateString)) {
      setFechasInhabilitadas(fechasInhabilitadas.filter((fecha) => fecha !== dateString));
      showNotification(`Fecha habilitada nuevamente: ${new Date(dateString).toLocaleDateString('es-ES')}`);
    } else {
      setFechasInhabilitadas([...fechasInhabilitadas, dateString]);
      showNotification(`Fecha inhabilitada: ${new Date(dateString).toLocaleDateString('es-ES')}`);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i + 1);
    const dateString = date.toISOString().split('T')[0];
    const isReserved = reservas.some(reserva => reserva.fecha === dateString);
    const isDisabled = fechasInhabilitadas.includes(dateString);
    return { date, dateString, isReserved, isDisabled };
  });

  return (
    <div className="cl-calendar-container">
      <header className="cl-header">
        <div className="cl-header-content">
          <img
            src="https://i.pinimg.com/originals/46/09/7c/46097ce4f245a1e5d767033fed857dfd.png"
            alt={barName}
            className="cl-bar-image"
            onError={(e) => (e.target.style.display = 'none')} 
          />
          <h1 className="cl-bar-name">{barName}</h1>
          <button className="cl-reserve-button">
            Reserva ahora
          </button>
        </div>
      </header>
      <main className="cl-main-content">
        {notification && (
          <div className="cl-notification">
            <p>{notification}</p>
          </div>
        )}
        <section className="cl-calendar-section">
          {isLoading ? (
            <p className="cl-loading-text">Cargando...</p>
          ) : error ? (
            <p className="cl-error-text">{error}</p>
          ) : (
            <div className="cl-calendar">
              <div className="cl-calendar-nav">
                <button className="cl-nav-button" onClick={handlePrevMonth}>Anterior</button>
                <span className="cl-current-month">{firstDayOfMonth.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</span>
                <button className="cl-nav-button" onClick={handleNextMonth}>Siguiente</button>
              </div>
              <div className="cl-days-of-week">
                {daysOfWeek.map((day) => (
                  <div key={day} className="cl-day-name">
                    {day}
                  </div>
                ))}
              </div>
              <div className="cl-days-grid">
                {Array.from({ length: startDay }).map((_, index) => (
                  <div key={`empty-${index}`} className="cl-empty-day"></div>
                ))}
                {calendarDays.map(({ date, dateString, isReserved, isDisabled }) => (
                  <div
                    key={dateString}
                    className={`cl-day ${
                      isReserved ? "cl-reserved" : isDisabled ? "cl-disabled" : "cl-available"
                    }`}
                    onClick={() => !isReserved && !isDisabled && handleDateSelect(dateString)}
                    onDoubleClick={() => handleInhabilitarFecha(dateString)} // Doble clic para habilitar/inhabilitar
                  >
                    <span className="cl-day-number">{date.getDate()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <footer className="cl-footer">
        <div className="cl-footer-content">
          <div className="cl-status-item">
            <div className="cl-status-indicator cl-available-indicator"></div>
            <span>Disponible</span>
          </div>
          <div className="cl-status-item">
            <div className="cl-status-indicator cl-reserved-indicator"></div>
            <span>Reservado</span>
          </div>
          <div className="cl-status-item">
            <div className="cl-status-indicator cl-disabled-indicator"></div>
            <span>Inhabilitado</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
