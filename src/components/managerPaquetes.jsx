import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import butterup from 'butteruptoasts';
import "../styles/butterup-2.0.0/butterup.css";
import "../styles/paquete-manager.css"; 

import {
  obtenerPaquetes,
  registrarPaquete,
  obtenerPaquete,
  actualizarPaquete,
  eliminarPaquete
} from '../api/projectapi.js';

export function PaqueteManager() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [paquetes, setPaquetes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchPaquetes();
  }, []);

  const fetchPaquetes = async () => {
    try {
      const res = await obtenerPaquetes();
      setPaquetes(res.data);
    } catch (error) {
      console.error('Error al obtener los paquetes', error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('nombrePaquete', data.nombrePaquete);
    formData.append('numeroCocteles', data.numeroCocteles);
    formData.append('precio', data.precio);
    formData.append('insumos', data.insumos);
    formData.append('numeroPersonas', data.numeroPersonas);
    formData.append('descripcion', data.descripcion);

    try {
      if (isEditing) {
        await actualizarPaquete(currentId, formData);
        butterup.toast({
          title: '🎉 ¡Actualizado!',
          message: 'Paquete actualizado exitosamente.',
          location: 'top-right',
          icon: false,
          dismissable: true,
          type: 'success',
        });
      } else {
        await registrarPaquete(formData);
        butterup.toast({
          title: '🎉 ¡Hurra!',
          message: 'Paquete registrado exitosamente.',
          location: 'top-right',
          icon: false,
          dismissable: true,
          type: 'success',
        });
      }
      fetchPaquetes();
      resetForm();
    } catch (error) {
      console.error('Error al registrar/actualizar el paquete', error);
      butterup.toast({
        title: '¡Oh!',
        message: 'Error al registrar/actualizar el paquete. Intentelo de nuevo',
        location: 'top-right',
        icon: false,
        dismissable: true,
        type: 'error',
      });
    }
  });

  const handleEdit = async (id) => {
    try {
      const res = await obtenerPaquete(id);
      const paquete = res.data;
      setValue('nombrePaquete', paquete.nombrePaquete);
      setValue('numeroCocteles', paquete.numeroCocteles);
      setValue('precio', paquete.precio);
      setValue('insumos', paquete.insumos);
      setValue('numeroPersonas', paquete.numeroPersonas);
      setValue('descripcion', paquete.descripcion);
      setIsEditing(true);
      setCurrentId(id);
    } catch (error) {
      console.error('Error al obtener el paquete', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await eliminarPaquete(id);
      butterup.toast({
        title: '🗑️ ¡Eliminado!',
        message: 'Paquete eliminado exitosamente.',
        location: 'top-right',
        icon: false,
        dismissable: true,
        type: 'success',
      });
      fetchPaquetes();
    } catch (error) {
      console.error('Error al eliminar el paquete', error);
      butterup.toast({
        title: '¡Oh!',
        message: 'Error al eliminar el paquete. Intentelo de nuevo',
        location: 'top-right',
        icon: true,
        dismissable: true,
        type: 'error',
      });
    }
  };

  const resetForm = () => {
    setValue('nombrePaquete', '');
    setValue('numeroCocteles', '');
    setValue('precio', '');
    setValue('insumos', '');
    setValue('numeroPersonas', '');
    setValue('descripcion', '');
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="containerADmi">
      <h1>{isEditing ? 'Editar Paquete' : 'Registrar Paquete'}</h1>
      <form onSubmit={onSubmit}>
        <label>Nombre del Paquete</label>
        <input
          type="text"
          name="nombrePaquete"
          {...register("nombrePaquete", { required: "El nombre es obligatorio", maxLength: 150 })}
        />
        {errors.nombrePaquete && <span>{errors.nombrePaquete.message}</span>}

        <label>Número de Cócteles</label>
        <input
          type="number"
          name="numeroCocteles"
          {...register("numeroCocteles", { required: "El número de cócteles es obligatorio", valueAsNumber: true })}
        />
        {errors.numeroCocteles && <span>{errors.numeroCocteles.message}</span>}

        <label>Precio</label>
        <input
          type="number"
          name="precio"
          {...register("precio", { required: "El precio es obligatorio", valueAsNumber: true })}
        />
        {errors.precio && <span>{errors.precio.message}</span>}

        <label>Insumos</label>
        <input
          type="text"
          name="insumos"
          {...register("insumos", { required: "Los insumos son obligatorios", maxLength: 200 })}
        />
        {errors.insumos && <span>{errors.insumos.message}</span>}

        <label>Número de Personas</label>
        <input
          type="number"
          name="numeroPersonas"
          {...register("numeroPersonas", { required: "El número de personas es obligatorio", valueAsNumber: true })}
        />
        {errors.numeroPersonas && <span>{errors.numeroPersonas.message}</span>}

        <label>Descripción</label>
        <input
          type="text"
          name="descripcion"
          {...register("descripcion", { required: "La descripción es obligatoria", maxLength: 200 })}
        />
        {errors.descripcion && <span>{errors.descripcion.message}</span>}

        <button type="submit">{isEditing ? 'Actualizar' : 'Registrar'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancelar</button>}
      </form>

      <h2>Lista de Paquetes</h2>
      <ul>
        {paquetes.map((paquete) => (
          <li key={paquete.id}>
            {paquete.nombrePaquete} - {paquete.numeroCocteles} cócteles - ${paquete.precio}
            <button onClick={() => handleEdit(paquete.id)}>Editar</button>
            <button onClick={() => handleDelete(paquete.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
