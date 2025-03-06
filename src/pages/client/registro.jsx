import React from 'react';
import { useForm } from 'react-hook-form';
import { registrarUsuario, registrarCuenta } from '../../api/projectapi';
import { useNavigate } from 'react-router-dom';
import butterup from 'butteruptoasts';
import '../../styles/butterup-2.0.0/butterup.css';
import '../../styles/login.css';

export function Registro() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const today = new Date();
  const maxDate = today.toISOString().split('T')[0];
  const minDate = '1900-01-01';

  const validateFechaNacimiento = (value) => {
    const fechaNacimiento = new Date(value);
    const fechaMinima = new Date(minDate);
    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    const mesDiferencia = fechaActual.getMonth() - fechaNacimiento.getMonth();

    if (fechaNacimiento < fechaMinima) {
      return 'La fecha de nacimiento no puede ser anterior al año 1900';
    }

    if (edad < 18 || (edad === 18 && mesDiferencia < 0) || (edad === 18 && mesDiferencia === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
      return 'Debe tener al menos 18 años';
    }

    return true;
  };

  const onSubmit = async (data) => {
    console.log("Datos enviados:", data);
    
    const processedData = {
      nombre: data.nombre,
      apellido: data.apellido,
      fecha_nacimiento: new Date(data.fecha_nacimiento).toISOString().split('T')[0],
      cedula: parseInt(data.cedula_ciudadania, 10),
      domicilio: data.domicilio,
      telefono: parseInt(data.telefono, 10),
      email: data.email,
      user: data.user,
      password: data.password
    };

    const cuentaData = {
      nombreUsuario: data.user, // Asegúrate de usar el campo correcto
      password: data.password
    };

    try {
      const response = await registrarUsuario(processedData);
      console.log("Usuario registrado", response);
      
      const responseCuenta = await registrarCuenta(cuentaData);
      console.log("Cuenta registrada", responseCuenta);

      if (response.status === 201 && responseCuenta.status === 201) {
        butterup.toast({
          title: '🎉 ¡Hurra!',
          message: 'Datos ingresados correctamente.',
          location: 'top-right',
          icon: false,
          dismissable: true,
          type: 'success',
        });

        setTimeout(() => {
          navigate('/login');
          window.location.reload();
        }, 1000); 
      } else {
        console.error("Error en el registro", response, responseCuenta);
        butterup.toast({
          title: '🚫 Error',
          message: 'Hubo un problema con el registro.',
          location: 'top-right',
          icon: false,
          dismissable: true,
          type: 'error',
        });
      }
    } catch (error) {
      console.error("Error en el registro", error.response ? error.response.data : error.message);
      butterup.toast({
        title: '🚫 Error',
        message: 'Hubo un problema con el registro.',
        location: 'top-right',
        icon: false,
        dismissable: true,
        type: 'error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='sign-up-form'>
      <h2 className='titleNew'>Registro</h2>
      <div className='inputslist'>
        <div className='input-field'>
          <i className="fa-solid fa-user"></i>
          <input 
            type="text"
            placeholder='Nombre' 
            {...register('nombre', {
              required: 'El nombre es requerido',
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Solo se permiten letras"
              }
            })} 
          />
          {errors.nombre && <p className='errors'>{errors.nombre.message}</p>}
        </div>
        <div className='input-field'>
          <i className="fa-regular fa-user"></i>
          <input 
            type="text" 
            placeholder='Apellido' 
            {...register('apellido', {
              required: 'El apellido es requerido',
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Solo se permiten letras"
              }
            })} 
          />
          {errors.apellido && <p className='errors'>{errors.apellido.message}</p>}
        </div>
        <div className='input-field'>
          <i className="fa-solid fa-calendar-days"></i>
          <input 
            type="date" 
            placeholder='Fecha de nacimiento' 
            {...register('fecha_nacimiento', {
              required: 'La fecha de nacimiento es requerida',
              validate: validateFechaNacimiento
            })} 
            min={minDate}
            max={maxDate}
          />
          {errors.fecha_nacimiento && <p className='errors'>{errors.fecha_nacimiento.message}</p>}
        </div>
        <div className='input-field'>
          <i className="fa-solid fa-address-card"></i>
          <input 
            type="number" 
            placeholder='Cedula de Identidad'
            {...register('cedula_ciudadania', {
              required: 'El número de cédula es requerido'
            })} 
            min={0}
          />
          {errors.cedula_ciudadania && <p className='errors'>{errors.cedula_ciudadania.message}</p>}
        </div>
        <div className='input-field'>
          <i className="fa-solid fa-address-book"></i>
          <input type="text" 
            placeholder='Domicilio'
            {...register('domicilio', { required: true })} 
          />
          {errors.domicilio && <p className='errors'>El domicilio es requerido</p>}
        </div>
        <div className='input-field'>
          <i className="fa-solid fa-phone-volume"></i>
          <input 
            type="number" 
            placeholder='Teléfono'
            {...register('telefono', {
              required: 'El número de teléfono es requerido'
            })} 
            min={0}
          />
          {errors.telefono && <p className='errors'>{errors.telefono.message}</p>}
        </div>
        <div className='input-field'>
          <i className="fa-solid fa-envelope"></i>
          <input 
            type="email" 
            placeholder='Correo'
            {...register('email', { required: true })} 
          />
          {errors.email && <p className='errors'>El correo es requerido</p>}
        </div>
        <div className='input-field'>
          <i className="fa-solid fa-user"></i>
          <input 
            type="text" 
            placeholder='Usuario' 
            {...register('user', { required: 'El usuario es requerido' })} 
          />
          {errors.user && <p className='errors'>{errors.user.message}</p>}
        </div>
        <div className='input-field'>
          <i className="fa-solid fa-lock"></i>
          <input 
            type="password" 
            placeholder='Password' 
            {...register('password', { required: 'La contraseña es requerida' })} 
          />
          {errors.password && <p className='errors'>{errors.password.message}</p>}
        </div>
      </div>
      <input type='submit' className='btn solid' />
    </form>
  );
}
