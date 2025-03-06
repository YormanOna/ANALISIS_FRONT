import axios from 'axios';

const API_URL = axios.create({
    baseURL: 'http://127.0.0.1:8000/info/api/info/',
});

export const obtenerCocteles = () => {
    return  API_URL.get('coctails/')
}
export const validarUsuario = (data) => {
    return API_URL.get('cuentacliente/', data)
}

export const registrarUsuario = (data) => {
    return API_URL.post('clientes/', data)
}
export const registrarCuenta = (data) => {
    const { id, ...accountData } = data;
    return API_URL.post('cuentacliente/', accountData);
};

export const registrarCoctel = (data) => {
    return API_URL.post('coctails/', data)
}

export const obtenerCoctel = (id) => {
    return API_URL.get(`coctails/${id}`)
}

export const actualizarCoctel = (id, data) => {
    return API_URL.put(`coctails/${id}/`, data);
};
export const eliminarCoctel = (id) => {
    return API_URL.delete(`coctails/${id}/`)
}

export const obtenerPaquetes = () => {
    return API_URL.get('paquetes/')
}
export const registrarPaquete = (data) => {
    return API_URL.post('paquetes/', data)
}
export const obtenerPaquete = (id) => {
    return API_URL.get(`paquetes/${id}`)
}
export const actualizarPaquete = (id, data) => {
    return API_URL.put(`paquetes/${id}/`, data);
};
export const eliminarPaquete = (id) => {
    return API_URL.delete(`paquetes/${id}/`)
}

export const guardarReserva = (data) => {
    return API_URL.post('reservas/', data)
}
export const obtenerReservas = () => {
    return API_URL.get('reservas/')
}