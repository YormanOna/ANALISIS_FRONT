import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import butterup from 'butteruptoasts';
import "../styles/butterup-2.0.0/butterup.css";
import "../styles/coctelManager.css"; 

import {
  obtenerCocteles,
  registrarCoctel,
  obtenerCoctel,
  actualizarCoctel,
  eliminarCoctel
} from '../api/projectapi.js';

export function CoctelManager() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [cocteles, setCocteles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchCocteles();
  }, []);

  const fetchCocteles = async () => {
    try {
      const res = await obtenerCocteles();
      setCocteles(res.data);
    } catch (error) {
      console.error('Error al obtener los cocteles', error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('tipo', data.tipo);
    formData.append('cantidad', data.cantidad);
    formData.append('precio', data.precio);
    formData.append('garnishes', data.garnishes);
    formData.append('mixers', data.mixers);
    if (data.imagen.length > 0) {
      formData.append('imagen', data.imagen[0]); 
    }

    try {
      if (isEditing) {
        await actualizarCoctel(currentId, formData);
        butterup.toast({
          title: '🎉 ¡Actualizado!',
          message: 'Coctel actualizado exitosamente.',
          location: 'top-right',
          icon: false,
          dismissable: true,
          type: 'success',
        });
      } else {
        await registrarCoctel(formData);
        butterup.toast({
          title: '🎉 ¡Hurra!',
          message: 'Coctel registrado exitosamente.',
          location: 'top-right',
          icon: false,
          dismissable: true,
          type: 'success',
        });
      }
      fetchCocteles();
      resetForm();
    } catch (error) {
      console.error('Error al registrar/actualizar el coctel', error);
      butterup.toast({
        title: '¡Oh!',
        message: 'Error al registrar/actualizar el coctel. Intentelo de nuevo',
        location: 'top-right',
        icon: false,
        dismissable: true,
        type: 'error',
      });
    }
  });

  const handleEdit = async (id) => {
    try {
      const res = await obtenerCoctel(id);
      const coctel = res.data;
      setValue('nombre', coctel.nombre);
      setValue('tipo', coctel.tipo);
      setValue('cantidad', coctel.cantidad);
      setValue('precio', coctel.precio);
      setValue('garnishes', coctel.garnishes);
      setValue('mixers', coctel.mixers);
      // Para el campo de imagen, no es necesario setearlo en el formulario
      setIsEditing(true);
      setCurrentId(id);
    } catch (error) {
      console.error('Error al obtener el coctel', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await eliminarCoctel(id);
      butterup.toast({
        title: '🗑️ ¡Eliminado!',
        message: 'Coctel eliminado exitosamente.',
        location: 'top-right',
        icon: false,
        dismissable: true,
        type: 'success',
      });
      fetchCocteles();
    } catch (error) {
      console.error('Error al eliminar el coctel', error);
      butterup.toast({
        title: '¡Oh!',
        message: 'Error al eliminar el coctel. Intentelo de nuevo',
        location: 'top-right',
        icon: false,
        dismissable: true,
        type: 'error',
      });
    }
  };

  const resetForm = () => {
    setValue('nombre', '');
    setValue('tipo', '');
    setValue('cantidad', '');
    setValue('precio', '');
    setValue('garnishes', '');
    setValue('mixers', '');
    setValue('imagen', '');
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="containerADmi">
      <h1>{isEditing ? 'Editar Cóctel' : 'Registrar Cóctel'}</h1>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <label>Nombre del Cóctel</label>
        <input
          type="text"
          name="nombre"
          {...register("nombre", { required: "El nombre es obligatorio", maxLength: 100 })}
        />
        {errors.nombre && <span>{errors.nombre.message}</span>}

        <label>Tipo</label>
        <input
          type="text"
          name="tipo"
          {...register("tipo", { required: "El tipo es obligatorio", maxLength: 100 })}
        />
        {errors.tipo && <span>{errors.tipo.message}</span>}

        <label>Cantidad</label>
        <input
          type="number"
          name="cantidad"
          {...register("cantidad", { required: "La cantidad es obligatoria", valueAsNumber: true })}
        />
        {errors.cantidad && <span>{errors.cantidad.message}</span>}

        <label>Precio</label>
        <input
          type="number"
          name="precio"
          {...register("precio", { required: "El precio es obligatorio", valueAsNumber: true })}
        />
        {errors.precio && <span>{errors.precio.message}</span>}
        <label>Garnishes</label>
        <input
          type="text"
          name="garnishes"
          {...register("garnishes", { required: "El garnish es obligatorio", maxLength: 100 })}
        />
        {errors.garnishes && <span>{errors.garnishes.message}</span>}

        <label>Mixers</label>
        <input
          type="text"
          name="mixers"
          {...register("mixers", { required: "El mixer es obligatorio", maxLength: 100 })}
        />
        {errors.mixers && <span>{errors.mixers.message}</span>}

        <label>Imagen</label>
        <input
          type="file"
          name="imagen"
          {...register("imagen")}
        />

        <button type="submit">{isEditing ? 'Actualizar' : 'Registrar'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancelar</button>}
      </form>

      <h2>Lista de Cócteles</h2>
      <ul>
        {cocteles.map((coctel) => (
          <li key={coctel.id}>
            {coctel.nombre} - {coctel.tipo} - {coctel.precio}
            <button onClick={() => handleEdit(coctel.id)}>Editar</button>
            <button onClick={() => handleDelete(coctel.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
