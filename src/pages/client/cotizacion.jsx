import React, { useState, useEffect } from "react";
import "../../styles/cotizacion.css";
import { obtenerCocteles, guardarReserva } from "../../api/projectapi";
import Notifications from "../../components/Notifications";
import butterup from 'butteruptoasts';
import '../../styles/butterup-2.0.0/butterup.css';

export function Cotizacion() {
  const [cocteles, setCocteles] = useState([]);
  const [seleccionados, setSeleccionados] = useState({});
  const [cantidad, setCantidad] = useState({});
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [direccion, setDireccion] = useState("");
  const [mostrarCotizacion, setMostrarCotizacion] = useState(false);
  const [extras, setExtras] = useState({
    dj: false,
    mobiliario: false,
    lugar: false,
  });

  useEffect(() => {
    const fetchCocteles = async () => {
      try {
        const res = await obtenerCocteles();
        setCocteles(res.data);
      } catch (error) {
        console.error("Error al obtener los cocteles", error);
      }
    };

    fetchCocteles();
  }, []);

  const handleGenerarCotizacion = () => {
    setMostrarCotizacion(true);
  };

  const calcularCostoEstimado = () => {
    let costoTotal = 0;
    cocteles.forEach((coctel) => {
      if (seleccionados[coctel.id] && cantidad[coctel.id]) {
        costoTotal += coctel.precio * cantidad[coctel.id];
      }
    });

    // Agregar costos adicionales por extras seleccionados
    if (extras.dj) costoTotal += 200;
    if (extras.mobiliario) costoTotal += 150;
    if (extras.lugar) costoTotal += 300;

    return costoTotal;
  };

  const handleEnviarReserva = async () => {
    // Validar datos antes de enviar
    if (!servicio || !fecha || !direccion || cocteles.length === 0) {
      butterup.toast({
        title: '¡Error!',
        message: 'Por favor complete todos los campos requeridos.',
        location: 'top-right',
        icon: false,
        dismissable: true,
        type: 'error',
      });
      return;
    }
  
    // Aquí se calcula el costo total
    const costoTotal = calcularCostoEstimado();
  
    const reserva = {
      servicio,
      fecha,
      direccion,
      cocteles: JSON.stringify(cocteles.map(coctel => ({
        nombre: coctel.nombre,
        cantidad: Number(cantidad[coctel.id]), // Asegúrate de que cantidad sea un número
      }))),
      extras,
      costo_estimado: parseFloat(costoTotal).toFixed(2), // Convertir a número con dos decimales
    };
  
    console.log("Datos de reserva:", reserva);
  
    try {
        await guardarReserva(reserva);
        butterup.toast({
          title: '¡Éxito!',
          message: 'La reserva se ha guardado correctamente.',
          location: 'top-right',
          icon: false,
          dismissable: true,
          type: 'success',
        });
        // Restablecer el formulario después de guardar la reserva
        ResetForm(); // Llama a la función para limpiar el formulario
        setMostrarCotizacion(false); // Asegúrate de cerrar la vista de cotización
      } catch (error) {
        if (error.response && error.response.data) {
          console.error('Detalles del error:', error.response.data);
          butterup.toast({
            title: '¡Error!',
            message: `Error al guardar la reserva: ${JSON.stringify(error.response.data)}`,
            location: 'top-right',
            icon: false,
            dismissable: true,
            type: 'error',
          });
        } else {
          console.error('Error al guardar la reserva:', error);
          butterup.toast({
            title: '¡Error!',
            message: 'Error desconocido al guardar la reserva.',
            location: 'top-right',
            icon: false,
            dismissable: true,
            type: 'error',
          });
        }
    }
  };
  
  const ResetForm = () => {
    setServicio("");
    setFecha("");
    setDireccion("");
    setSeleccionados({});
    setCantidad({});
    setExtras({
      dj: false,
      mobiliario: false,
      lugar: false,
    });
  };

  const actualizarCocteles = async () => {
    try {
      const res = await obtenerCocteles(); // Llama a la API para obtener los cócteles
      setCocteles(res.data); // Actualiza el estado con los nuevos cócteles
      console.log("Lista de cócteles actualizada:", res.data);
    } catch (error) {
      console.error("Error al actualizar los cócteles", error);
    }
  };

  return (
    <div>
      {!mostrarCotizacion ? (
        <div className="bodyC">
          <Notifications onNewNotification={actualizarCocteles} />
          <div className="containerC">
            <h1 className="titleC">¡Bienvenido a nuestra sección de Cotización Automática!</h1>
            <div className="sectionC">
              <h2 className="section-titleC">Servicio</h2>
              <select
                className="inputC"
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
              >
                <option value="" disabled>
                  Tipo de evento
                </option>
                <option value="Bartender">Bartender</option>
                <option value="Catering">Catering</option>
              </select>
            </div>
            <div className="sectionC">
              <h2 className="section-titleC">Fecha y hora</h2>
              <input
                type="datetime-local"
                className="inputC"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>
            <div className="sectionC">
              <h2 className="section-titleC">Dirección</h2>
              <input
                className="inputC"
                placeholder="Dirección del evento"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
            <div className="sectionC">
              <h2 className="section-titleC">Detalles del servicio</h2>
              <div className="border-boxC">
                <h3 className="section-titleC">Bebidas</h3>
                <div className="gridC grid-3-colsC">
                  {cocteles.map((coctel) => (
                    <div className="coctel-cardC" key={coctel.id}>
                      <img
                        src={coctel.imagen}
                        alt={coctel.nombre}
                        className="coctel-imgC"
                      />
                      <div className="coctel-infoC">
                        <input
                          type="checkbox"
                          id={`coctel-${coctel.id}`}
                          checked={!!seleccionados[coctel.id]}
                          onChange={() =>
                            setSeleccionados((prev) => ({
                              ...prev,
                              [coctel.id]: !prev[coctel.id],
                            }))
                          }
                        />
                        <label
                          htmlFor={`coctel-${coctel.id}`}
                          className="checkbox-labelC"
                        >
                          {coctel.nombre}
                        </label>
                        <p className="coctel-descripcionC">
                          {coctel.descripcion}
                        </p>
                        <p className="coctel-precioC">
                          Precio: ${coctel.precio}
                        </p>
                        {seleccionados[coctel.id] && (
                          <div className="coctel-quantityC">
                            <label
                              htmlFor={`cantidad-${coctel.id}`}
                              className="cantidad-labelC"
                            >
                              Cantidad:
                            </label>
                            <input
                              type="number"
                              id={`cantidad-${coctel.id}`}
                              min="0"
                              className="input-cantidadC"
                              value={cantidad[coctel.id] || 0}
                              onChange={(e) =>
                                setCantidad((prev) => ({
                                  ...prev,
                                  [coctel.id]: e.target.value,
                                }))
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="noteC">
                  Nota: Recuerde que entre más cócteles seleccione, mayor será el
                  valor de la cotización.
                </p>
              </div>
              <div className="border-boxC">
                <h3 className="section-titleC">Extras</h3>
                <div className="gridC grid-3-colsC">
                  <div className="flex-centerC">
                    <input
                      type="checkbox"
                      id="dj"
                      checked={extras.dj}
                      onChange={(e) => setExtras((prev) => ({
                        ...prev,
                        dj: e.target.checked,
                      }))}
                    />
                    <label htmlFor="dj" className="checkbox-labelC">
                      DJ - $200
                    </label>
                  </div>
                  <div className="flex-centerC">
                    <input
                      type="checkbox"
                      id="mobiliario"
                      checked={extras.mobiliario}
                      onChange={(e) => setExtras((prev) => ({
                        ...prev,
                        mobiliario: e.target.checked,
                      }))}
                    />
                    <label htmlFor="mobiliario" className="checkbox-labelC">
                      Mobiliario (barra libre) - $150
                    </label>
                  </div>
                  <div className="flex-centerC">
                    <input
                      type="checkbox"
                      id="lugar"
                      checked={extras.lugar}
                      onChange={(e) => setExtras((prev) => ({
                        ...prev,
                        lugar: e.target.checked,
                      }))}
                    />
                    <label htmlFor="lugar" className="checkbox-labelC">
                      Lugar para el evento - $300
                    </label>
                  </div>
                </div>
                <p className="noteC">
                  Nota: En caso de no tener un lugar para realizar su evento,
                  puede reservar nuestra hacienda en Guayllabamba.
                </p>
              </div>
            </div>
            <div className="flex-space-betweenC">
              <button className="buttonC button-outlineC">Cancelar</button>
              <button className="buttonC" onClick={handleGenerarCotizacion}>
                Generar Cotización
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cotizacion-emergenteC">
          <div className="cotizacion-emergente-contentC">
            <h2>Cotizar evento</h2>
            <p>
              Muchas gracias por utilizar nuestro servicio de cotización. A
              continuación se mostrará un detalle de valores calculados.
            </p>
            <p><strong>Servicio:</strong> {servicio}</p>
            <p><strong>Fecha:</strong> {new Date(fecha).toLocaleString()}</p>
            <p><strong>Dirección:</strong> {direccion}</p>
            <p><strong>Bebidas:</strong></p>
            <ul>
              {cocteles
                .filter((coctel) => seleccionados[coctel.id])
                .map((coctel) => (
                  <li key={coctel.id}>
                    {coctel.nombre} - {cantidad[coctel.id]} unidades - $
                    {coctel.precio * cantidad[coctel.id]}
                  </li>
                ))}
            </ul>
            <p><strong>Extras:</strong></p>
            <ul>
              {extras.dj && <li>DJ - $200</li>}
              {extras.mobiliario && <li>Mobiliario (barra libre) - $150</li>}
              {extras.lugar && <li>Lugar para el evento - $300</li>}
            </ul>
            <p><strong>Costo estimado:</strong> ${calcularCostoEstimado()}</p>
            <button className="buttonC" onClick={() => setMostrarCotizacion(false)}>Regresar</button>
            <button className="buttonC" onClick={handleEnviarReserva}>
              Enviar Solicitud de Reserva
            </button>
          </div>
        </div>
      )}
    </div>
  );
}