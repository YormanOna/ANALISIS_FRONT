import React, { useState } from 'react';
import axios from 'axios';
import '../styles/contact.css';
import butterup from 'butteruptoasts';
import '../styles/butterup-2.0.0/butterup.css';

export function Conctactos() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendMail = () => {
    axios
      .post('http://127.0.0.1:8000/info/send-email/', {  
        email,
        subject,
        message,
      })
      .then(response => {
        
        
        console.log('success', response);
        butterup.toast({
            title: '😎✔️¡Gracias!',
            message: 'Mensaje enviado nos contactaremos con usted.',
            location: 'top-right',
            icon: false,
            dismissable: true,
            type: 'success',
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);

        setEmail('');
        setSubject('');
        setMessage('');
      })
      .catch(error => {
        
        
        console.log('failure', error);
        butterup.toast({
            title: '🚫 Error',
            message: 'Hubo un problema al enviar el mensaje.',
            location: 'top-right',
            icon: false,
            dismissable: true,
            type: 'error',
          });
      });
  };

  return (
    <div className='body'>
    <div className="contact-form-container">
      <h2>Contáctanos</h2>
      <input
        type="email"
        placeholder="Ingrese su correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="contact-form-input"
        required
      />
      <br />
      <input
        type="text"
        placeholder="Motivo"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="contact-form-input"
        required
      />
      <br />
      <textarea
        placeholder="Mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="contact-form-textarea"
        required
      />
      <br />
      <button onClick={sendMail} className="contact-form-button">Enviar Mensaje</button>
      {status && <p className="contact-form-status">{status}</p>}
    </div>
    </div>
  );
}

